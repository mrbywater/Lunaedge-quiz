import './Quiz.scss';
import { Button, Group, Radio } from '@mantine/core';
import { useState } from 'react';
import { IconArrowNarrowRight } from '@tabler/icons-react';

const test = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aperiam, earum error, in minima nam nihil optio placeat provident sapiente similique sunt tempore, temporibus voluptas. Consequatur eligendi neque quibusdam.      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aperiam, earum error, in minima nam nihil optio placeat provident sapiente similique sunt tempore, temporibus voluptas. Consequatur eligendi neque quibusdam.',
  '2',
  '3',
  '4',
];

const Quiz = () => {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="quizMainContainer">
      <span>Quiz Name</span>
      <span>Question 1 of 25:</span>
      <span>Question example?</span>
      <div className="answersContainer">
        <Radio.Group value={answer} onChange={setAnswer}>
          {test.map(answer => (
            <Radio.Card value={answer} key={answer} className="radioItem">
              <Group>
                <Radio.Indicator />
                <div>{answer}</div>
              </Group>
            </Radio.Card>
          ))}
        </Radio.Group>
      </div>
      <div className="nextStepContainer">
        <Button rightSection={<IconArrowNarrowRight size={14} />}>Next</Button>
        <div>0:22</div>
      </div>
    </div>
  );
};

export default Quiz;
