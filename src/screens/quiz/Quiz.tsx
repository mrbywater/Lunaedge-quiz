import './Quiz.scss';
import { Button } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import SingleAnswer from '../../components/quizAnswers/singleAnswer/SingleAnswer';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Question,
  QuizResultData,
  QuizType,
} from '../../constants/globalTypes';
import { useEffect, useState } from 'react';
import MultiAnswer from '../../components/quizAnswers/multiAnswer/MultiAnswer';
import TextAnswer from '../../components/quizAnswers/textAnswer/TextAnswer';
import { fakeApiCall } from '../../utils/fakeApiCall';
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const storedArray = JSON.parse(localStorage.getItem('quizArray') || '[]');

  const quiz = storedArray.find((item: QuizType) => item.id === quizId);
  const questions = quiz.data && quiz.data.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(string | string[])[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleYourAnswer = (userAnswer: string[] | string) => {
    const updatedAnswers = [...quizAnswers];
    updatedAnswers[currentQuestionIndex] = userAnswer;
    setQuizAnswers(updatedAnswers);
  };

  const selectedAns: any = {
    Single: (
      <SingleAnswer
        answersArr={currentQuestion.answers}
        setRightAnswer={handleYourAnswer}
      />
    ),
    Multiply: (
      <MultiAnswer
        answersArr={currentQuestion.answers}
        setRightAnswer={handleYourAnswer}
      />
    ),
    Text: <TextAnswer setRightAnswer={handleYourAnswer} />,
  };
  const evaluateAnswer = (
    correctAnswer: string[],
    givenAnswer: string[],
    maxScore: string | number,
  ) => {
    const correctElementsCount = givenAnswer.filter(item =>
      correctAnswer.includes(item),
    ).length;
    const score = (correctElementsCount / correctAnswer.length) * +maxScore;
    return score;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const totalScoreSum = (resultsArray: number[]) =>
    resultsArray.reduce((total: number, mark: number) => total + mark, 0);

  const endTheQuiz = async () => {
    const results = questions.map((item: Question, index: number) => {
      const userAnswer = quizAnswers[index];
      let mark;

      if (item.typeOfQuestion !== 'Multiply') {
        mark = item.rightAnswers === userAnswer ? +item.mark : 0;
      } else if (
        Array.isArray(item.rightAnswers) &&
        Array.isArray(userAnswer)
      ) {
        mark = evaluateAnswer(item.rightAnswers, userAnswer, item.mark);
      }

      return {
        question: item.question,
        rightAnswers: item.rightAnswers,
        yourAnswer: userAnswer,
        mark: mark,
      };
    });

    const answersMarks = results.map((item: QuizResultData) => +item.mark);
    const maxMarks = questions.map((item: Question) => +item.mark);
    const totalScore =
      (totalScoreSum(answersMarks) / totalScoreSum(maxMarks)) * 100;

    const newResults = {
      data: results,
      time: formatTime(timeElapsed),
      totalScore: totalScore,
      id: uuidv4(),
    };

    quiz.results
      ? (quiz.results = [...quiz.results, newResults])
      : (quiz.results = [newResults]);

    localStorage.setItem('quizArray', JSON.stringify(storedArray));
    setIsLoading(true);
    await fakeApiCall(null, 1500);
    setIsLoading(false);
    navigate('/results');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <ReactLoading type={'bubbles'} color={'black'} height={50} width={50} />
    );
  }

  return (
    <div className="quizMainContainer">
      <span>Quiz {quiz.data.name}</span>
      <span>
        Question {currentQuestionIndex + 1} of {questions.length}:
      </span>
      <span>{currentQuestion.question}</span>
      <div className="answersContainer">
        {selectedAns[currentQuestion.typeOfQuestion]}
      </div>
      <div className="nextStepContainer">
        {currentQuestionIndex === questions.length - 1 ? (
          <Button onClick={endTheQuiz}>End</Button>
        ) : (
          <Button
            rightSection={<IconArrowNarrowRight size={14} />}
            onClick={handleNextQuestion}>
            Next
          </Button>
        )}
        <div>{formatTime(timeElapsed)}</div>
      </div>
    </div>
  );
};

export default Quiz;
