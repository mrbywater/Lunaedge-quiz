import { ActionIcon, Group, Radio } from '@mantine/core';
import '../QuizAnswers.scss';
import { IconX } from '@tabler/icons-react';
import { SingleProps } from '../quizAnswersType';
const SingleAnswer = (props: SingleProps) => {
  const { answersArr, deleteCross, deleteAnswer, setRightAnswer, rightAnswer } =
    props;

  const handleRightAnswer = (selectedAnswers: string) => {
    setRightAnswer && setRightAnswer(selectedAnswers);
  };
  return (
    <Radio.Group value={rightAnswer} onChange={handleRightAnswer}>
      {answersArr?.map((answer, index: number) => (
        <Radio.Card
          value={answer}
          key={`single_answer_${answer}_${index}`}
          className="answerItem">
          <Group>
            <Radio.Indicator />
            <div>{answer}</div>
            {deleteCross && deleteAnswer && (
              <ActionIcon
                size="12px"
                variant="light"
                radius="xl"
                color="#000"
                onClick={deleteAnswer(answer)}>
                <IconX stroke={1.5} />
              </ActionIcon>
            )}
          </Group>
        </Radio.Card>
      ))}
    </Radio.Group>
  );
};

export default SingleAnswer;
