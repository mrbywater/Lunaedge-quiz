import './Results.scss';
import { IconArrowBackUp } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { QuizResult } from '../../constants/globalTypes';
import { Link } from 'react-router-dom';

const Results = () => {
  const resultsArray = JSON.parse(
    localStorage.getItem('quizResultArray') || '[]',
  );

  const totalScore = resultsArray.reduce(
    (total: number, question: QuizResult) => total + question.data.mark,
    0,
  );
  return (
    <div className="resultsMainContainer">
      {resultsArray.map((answer: QuizResult, index: number) => (
        <div key={`answer_${index}`} className="answerInfo">
          <span>{index + 1}</span>
          <span>
            <b>Your answer:</b>{' '}
            {Array.isArray(answer.data.yourAnswer)
              ? answer.data.yourAnswer.join(', ')
              : answer.data.yourAnswer}
          </span>
          <span>
            <b>Right answer:</b>{' '}
            {Array.isArray(answer.data.rightAnswers)
              ? answer.data.rightAnswers.join(', ')
              : answer.data.rightAnswers}
          </span>
          <span>Score: {answer.data.mark}</span>
        </div>
      ))}
      <div className="totalResultsContainer">
        <div>
          <span>
            <b>Total Score:</b> {totalScore}
          </span>
          <span>
            <b>Time spent:</b> {resultsArray[0].time}
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
