import './Results.scss';
import { IconArrowBackUp } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { QuizResultData, QuizType } from '../../constants/globalTypes';
import { Link, useParams } from 'react-router-dom';

const Results = () => {
  const { resultId, quizId } = useParams();

  const resultsArray = JSON.parse(localStorage.getItem('quizArray') || '[]');
  const storedQuiz = resultsArray.find((item: QuizType) => item.id === quizId);
  const result = storedQuiz.results.find((item: any) => item.id === resultId);

  return (
    <div className="resultsMainContainer">
      {result.data.map((answer: QuizResultData, index: number) => (
        <div key={`answer_${index}`} className="answerInfo">
          <span>{index + 1}</span>
          <span>
            <b>Question</b>: {answer.question}
          </span>
          <span>
            <b>Your answer:</b>{' '}
            {Array.isArray(answer.yourAnswer)
              ? answer.yourAnswer.join(', ')
              : answer.yourAnswer}
          </span>
          <span>
            <b>Right answer:</b>{' '}
            {Array.isArray(answer.rightAnswers)
              ? answer.rightAnswers.join(', ')
              : answer.rightAnswers}
          </span>
          <span>Score: {answer.mark}</span>
        </div>
      ))}
      <div className="totalResultsContainer">
        <div>
          <span>
            <b>Total Score:</b> {(result.totalScore + '').slice(0, 5)}%
          </span>
          <span>
            <b>Time spent:</b> {result.time}
          </span>
        </div>
        <Link to={'/'}>
          <Button rightSection={<IconArrowBackUp size={18} />}>Exit</Button>
        </Link>
      </div>
    </div>
  );
};

export default Results;
