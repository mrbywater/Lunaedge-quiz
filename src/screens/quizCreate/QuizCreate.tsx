import './QuizCreate.scss';
import { ActionIcon, Button, Input, NumberInput } from '@mantine/core';
import DropDown from '../../components/inputsComponents/dropDown/DropDown';
import { ANSWER_OPTIONS, INITIAL_QUESTION } from '../../constants';
import { IconPlus } from '@tabler/icons-react';
import SingleAnswer from '../../components/quizAnswers/singleAnswer/SingleAnswer';
import { useEffect, useRef, useState } from 'react';
import MultiAnswer from '../../components/quizAnswers/multiAnswer/MultiAnswer';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../errorPage/ErrorPage';
import TextAnswerCreate from '../../components/quizAnswers/textAnswer/TextAnswerCreate';
import { Question, QuizType } from '../../constants/globalTypes';
import { fakeApiCall } from '../../utils/fakeApiCall';
import ReactLoading from 'react-loading';

type NewData = {
  name: string;
  questions: Question[];
};

const QuizCreate = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const questionTitleRef = useRef<HTMLInputElement>(null);
  const quizTitleRef = useRef<HTMLInputElement>(null);
  const answerTitleRef = useRef<HTMLInputElement>(null);

  const storedArray = JSON.parse(localStorage.getItem('quizArray') || '[]');
  const availablePath = storedArray.map((item: QuizType) => item.id);
  const pathIsAvailable = availablePath.includes(quizId);
  const storedQuiz = storedArray.find((item: QuizType) => item.id === quizId);

  const [selectedOption, setSelectedOption] = useState<string>('Single');
  const [possibleAnswerArray, setPossibleAnswerArray] = useState<string[]>([]);
  const [rightAnswer, setRightAnswer] = useState<string[] | string>([]);
  const [mark, setMark] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>(
    storedQuiz.data
      ? [...storedQuiz.data.questions, INITIAL_QUESTION]
      : [INITIAL_QUESTION],
  );
  const [error, setError] = useState<string | null>(null);
  const [quizError, setQuizError] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    storedQuiz.data ? storedQuiz.data.questions.length : 0,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonDisable =
    selectedOption === 'Text' && !!possibleAnswerArray.length;

  const deleteAnswer = (answerToDelete: string) => () => {
    if (selectedOption === 'Text') {
      setPossibleAnswerArray([]);
    } else {
      setPossibleAnswerArray(
        possibleAnswerArray.filter(answer => answer !== answerToDelete),
      );
    }
  };

  const selectedAns: any = {
    Single: (
      <SingleAnswer
        answersArr={possibleAnswerArray}
        deleteCross={true}
        deleteAnswer={deleteAnswer}
        setRightAnswer={setRightAnswer}
        rightAnswer={typeof rightAnswer === 'string' ? rightAnswer : ''}
      />
    ),
    Multiply: (
      <MultiAnswer
        answersArr={possibleAnswerArray}
        deleteCross={true}
        deleteAnswer={deleteAnswer}
        setRightAnswer={setRightAnswer}
        rightAnswer={Array.isArray(rightAnswer) ? rightAnswer : []}
      />
    ),
    Text: (
      <TextAnswerCreate
        answersArr={possibleAnswerArray}
        deleteAnswer={deleteAnswer}
      />
    ),
  };

  const updateDataById = (id: string, newData: NewData) => {
    const updatedArray = storedArray.map((item: any) => {
      if (item.id === id) {
        return { ...item, data: newData };
      }
      return item;
    });
    localStorage.setItem('quizArray', JSON.stringify(updatedArray));
  };

  const addToPossibleAnswerArray = () => {
    if (answerTitleRef.current?.value.length) {
      setPossibleAnswerArray([
        ...possibleAnswerArray,
        answerTitleRef.current.value,
      ]);
      answerTitleRef.current.value = '';
    }
  };

  const getMark = (event: string | number) => setMark(+event);
  const addQuestion = () => {
    if (
      questionTitleRef.current?.value.length &&
      possibleAnswerArray.length &&
      rightAnswer.length
    ) {
      const newQuestion: Question = {
        question: questionTitleRef.current?.value.length
          ? questionTitleRef.current?.value
          : 'ExpQuestion',
        mark: mark,
        typeOfQuestion: selectedOption,
        answers: [...possibleAnswerArray],
        rightAnswers: rightAnswer,
      };

      if (isEditing) {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = newQuestion;
        setQuestions(updatedQuestions);
        setIsEditing(false);
        setCurrentQuestionIndex(questions.length - 1);
      } else {
        const updatedQuestions = [...questions, INITIAL_QUESTION];
        updatedQuestions[currentQuestionIndex] = newQuestion;
        setQuestions(updatedQuestions);
        setCurrentQuestionIndex(questions.length);
      }

      setError(null);
    } else setError('Fill the fields');
  };

  const goToQuestionByIndex = (index: number) => () => {
    setCurrentQuestionIndex(index);
    index === questions.length - 1 ? setIsEditing(false) : setIsEditing(true);
  };

  const addQuiz = async () => {
    if (quizTitleRef.current?.value && questions.length > 1 && quizId) {
      updateDataById(quizId, {
        name: quizTitleRef.current?.value,
        questions: questions.slice(0, -1),
      });
      setIsLoading(true);
      await fakeApiCall(null, 1500);
      setIsLoading(false);
      navigate(`/`);
    } else setQuizError(true);
  };

  useEffect(() => {
    const selectedQuestion = questions[currentQuestionIndex];

    setRightAnswer(selectedQuestion.rightAnswers);
    setPossibleAnswerArray(selectedQuestion.answers);
    setSelectedOption(selectedQuestion.typeOfQuestion);
    setMark(selectedQuestion.mark);
    if (questionTitleRef.current)
      questionTitleRef.current.value = selectedQuestion.question;
  }, [currentQuestionIndex]);

  useEffect(() => {
    setRightAnswer([]);
    setPossibleAnswerArray([]);
    setMark(1);
    if (questionTitleRef.current) questionTitleRef.current.value = '';
  }, [questions.length]);

  useEffect(() => {
    if (selectedOption === 'Text' && possibleAnswerArray.length === 1) {
      setRightAnswer(possibleAnswerArray[0]);
    }
  }, [possibleAnswerArray]);

  if (isLoading) {
    return (
      <ReactLoading type={'bubbles'} color={'black'} height={50} width={50} />
    );
  }

  return pathIsAvailable ? (
    <div className="quizCreateMainContainer">
      <div>
        <Input.Wrapper label="Title">
          <Input
            placeholder="Add title of quiz"
            ref={quizTitleRef}
            defaultValue={storedQuiz.data ? storedQuiz.data.name : ''}
          />
        </Input.Wrapper>
      </div>
      <div className="questionAddContainer">
        <div>
          <span>Question №{currentQuestionIndex + 1}</span>
          <div className="questionAddInputContainer">
            <Input.Wrapper label="Question">
              <Input
                placeholder="Add title of question"
                ref={questionTitleRef}
              />
            </Input.Wrapper>
          </div>
          <NumberInput
            label="Enter mark"
            placeholder="Write mark"
            clampBehavior="strict"
            allowDecimal={false}
            value={mark}
            onChange={getMark}
            min={1}
            max={100}
          />
          <DropDown
            data={ANSWER_OPTIONS}
            label="Answer option"
            placeholder="Choose the answer option"
            value={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div>
          <Input ref={answerTitleRef} />
          <ActionIcon
            variant="filled"
            size="lg"
            disabled={buttonDisable}
            onClick={addToPossibleAnswerArray}>
            <IconPlus stroke={1.5} />
          </ActionIcon>
        </div>
        <div>{selectedAns[selectedOption]}</div>
        <div>
          {error && <div className="errorFields">{error}</div>}
          <Button onClick={addQuestion}>
            {isEditing ? 'Save Question' : 'Add Question'}
          </Button>
        </div>
      </div>
      <div className="questionRouteContainer">
        {questions.map((question: Question, index: number) => (
          <ActionIcon
            variant="filled"
            size="lg"
            key={`question_${index}`}
            onClick={goToQuestionByIndex(index)}>
            {index + 1}
          </ActionIcon>
        ))}
      </div>
      <div className="addQuizButton">
        {quizError && (
          <div className="errorFields">Add title and questions</div>
        )}
        <Button rightSection={<IconPlus stroke={1.5} />} onClick={addQuiz}>
          Add Quiz
        </Button>
      </div>
    </div>
  ) : (
    <ErrorPage />
  );
};

export default QuizCreate;
