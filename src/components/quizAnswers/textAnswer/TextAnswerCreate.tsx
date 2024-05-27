import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { AnswerProps } from '../quizAnswersType';

const TextAnswerCreate = (props: AnswerProps) => {
  const { answersArr, deleteAnswer } = props;

  return (
    !!answersArr.length && (
      <div className="answerItem textAnswerCreateContainer">
        <span>{answersArr}</span>
        {deleteAnswer && (
          <ActionIcon
            size="12px"
            variant="light"
            radius="xl"
            color="#000"
            onClick={deleteAnswer(answersArr[0])}>
            <IconX stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    )
  );
};

export default TextAnswerCreate;
