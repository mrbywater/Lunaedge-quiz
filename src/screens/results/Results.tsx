import './Results.scss';
import { IconArrowBackUp } from '@tabler/icons-react';
import { Button } from '@mantine/core';

const test = [
  {
    index: 0,
    score: 1,
    rightAnswer: '1',
    answer: '1',
  },
  {
    index: 1,
    score: 0,
    rightAnswer: '1',
    answer: '2',
  },
  {
    index: 2,
    score: 1,
    rightAnswer: '1',
    answer: '1',
  },
  {
    index: 3,
    score: 1,
    rightAnswer: '1',
    answer:
      '     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis harum ipsum natus obcaecati quae sed, suscipit. Assumenda, consectetur cupiditate debitis deleniti dolor, fugit harum id illum officia, ratione saepe suscipit!',
  },
];

const Results = () => {
  const totalScore = test.reduce(
    (total, question) => total + question.score,
    0,
  );
  return (
    <div className="resultsMainContainer">
      {test.map(answer => (
        <div key={`answer_${answer.index}`} className="answerInfo">
          <span>{answer.index}</span>
          <span>
            <b>Your answer:</b> {answer.answer}
          </span>
          <span>
            <b>Right answer:</b> {answer.rightAnswer}
          </span>
          <span>Score: {answer.score}</span>
        </div>
      ))}
      <div className="totalResultsContainer">
        <div>
          <span>
            <b>Total Score:</b> {totalScore}
          </span>
          <span>
            <b>Time spent:</b> 12:21
          </span>
        </div>
        <Button rightSection={<IconArrowBackUp size={18} />}>Exit</Button>
      </div>
    </div>
  );
};

export default Results;
