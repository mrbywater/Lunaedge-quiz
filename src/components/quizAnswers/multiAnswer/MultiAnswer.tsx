import { Group, Checkbox, ActionIcon } from '@mantine/core';
import '../QuizAnswers.scss';
import { IconX } from '@tabler/icons-react';
import { MultiProps } from '../quizAnswersType';
const MultiAnswer = (props: MultiProps) => {
  const {
    answersArr,
    handleYourAnswer,
    deleteCross,
    deleteAnswer,
    setRightAnswer,
    rightAnswer,
  } = props;
  const handleRightAnswer = (selectedAnswers: string[]) => {
    setRightAnswer && setRightAnswer(selectedAnswers);
    handleYourAnswer && handleYourAnswer(selectedAnswers);
  };

  return (
    <Checkbox.Group value={rightAnswer} onChange={handleRightAnswer}>
      {answersArr?.map((answer, index: number) => (
        <Checkbox.Card
          value={answer}
          key={`multi_answer_${answer}_${index}`}
          className="answerItem">
          <Group>
            <Checkbox.Indicator />
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
        </Checkbox.Card>
      ))}
    </Checkbox.Group>
  );
};

export default MultiAnswer;
