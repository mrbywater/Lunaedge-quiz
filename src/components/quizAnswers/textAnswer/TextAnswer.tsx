import { TextInput } from '@mantine/core';
import { ChangeEvent } from 'react';

type TextAnswerProps = {
  setRightAnswer?: (answer: string) => void;
};

const TextAnswer = (props: TextAnswerProps) => {
  const { setRightAnswer } = props;

  const setAnswerHandler = () => (event: ChangeEvent<HTMLInputElement>) => {
    setRightAnswer && setRightAnswer(event.target.value);
  };

  return (
    <TextInput placeholder="Write your answer" onChange={setAnswerHandler()} />
  );
};

export default TextAnswer;
