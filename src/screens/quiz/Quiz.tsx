import './Quiz.scss';
import { Button } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import SingleAnswer from '../../components/quizAnswers/singleAnswer/SingleAnswer';

const test = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aperiam, earum error, in minima nam nihil optio placeat provident sapiente similique sunt tempore, temporibus voluptas. Consequatur eligendi neque quibusdam.      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aperiam, earum error, in minima nam nihil optio placeat provident sapiente similique sunt tempore, temporibus voluptas. Consequatur eligendi neque quibusdam.',
  '2',
  '3',
  '4',
];

const Quiz = () => {
  return (
    <div className="quizMainContainer">
      <span>Quiz Name</span>
      <span>Question 1 of 25:</span>
      <span>Question example?</span>
      <div className="answersContainer">
        <SingleAnswer answersArr={test} />
      </div>
      <div className="nextStepContainer">
        <Button rightSection={<IconArrowNarrowRight size={14} />}>Next</Button>
        <div>0:22</div>
      </div>
    </div>
  );
};

export default Quiz;
