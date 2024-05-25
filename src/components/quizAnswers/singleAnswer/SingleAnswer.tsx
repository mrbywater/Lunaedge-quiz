import { Group, Radio } from '@mantine/core';
import { useState } from 'react';
import '../QuizAnswers.scss';

type SingleAnswerProps = {
  answersArr: string[];
};

const SingleAnswer = (props: SingleAnswerProps) => {
  const { answersArr } = props;

  const [singleAnswer, setSingleAnswer] = useState<string | null>(null);

  return (
    <Radio.Group value={singleAnswer} onChange={setSingleAnswer}>
      {answersArr?.map(answer => (
        <Radio.Card
          value={answer}
          key={`single_answer_${answer}`}
          className="answerItem">
          <Group>
            <Radio.Indicator />
            <div>{answer}</div>
          </Group>
        </Radio.Card>
      ))}
    </Radio.Group>
  );
};

export default SingleAnswer;
