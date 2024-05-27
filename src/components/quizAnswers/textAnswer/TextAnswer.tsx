import { TextInput } from '@mantine/core';
import { ChangeEvent } from 'react';

type TextAnswerProps = {
  handleYourAnswer?: (answer: string) => void;
};

const TextAnswer = (props: TextAnswerProps) => {
  const { handleYourAnswer } = props;

  const setAnswerHandler = () => (event: ChangeEvent<HTMLInputElement>) => {
    handleYourAnswer && handleYourAnswer(event.target.value);
  };

  return (
    <TextInput placeholder="Write your answer" onChange={setAnswerHandler()} />
  );
};

export default TextAnswer;
