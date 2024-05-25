import { Group, Checkbox } from '@mantine/core';
import { useState } from 'react';
import '../QuizAnswers.scss';

type MultiAnswerProps = {
  answersArr: string[];
};

const MultiAnswer = (props: MultiAnswerProps) => {
  const { answersArr } = props;

  const [MultiAnswer, setMultiAnswer] = useState<string[]>([]);

  return (
    <Checkbox.Group value={MultiAnswer} onChange={setMultiAnswer}>
      {answersArr?.map(answer => (
        <Checkbox.Card
          value={answer}
          key={`multi_answer_${answer}`}
          className="answerItem">
          <Group>
            <Checkbox.Indicator />
            <div>{answer}</div>
          </Group>
        </Checkbox.Card>
      ))}
    </Checkbox.Group>
  );
};

export default MultiAnswer;
