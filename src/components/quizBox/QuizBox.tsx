import './QuizBox.scss';
import { IconX, IconPencil } from '@tabler/icons-react';

type QuizBoxProps = {
  name: string;
};

const QuizBox = (props: QuizBoxProps) => {
  const { name } = props;

  return (
    <div className="quizBoxMainContainer">
      <div>{name}</div>
      <div>
        <IconPencil stroke={1.5} />
        <IconX stroke={1.5} />
      </div>
    </div>
  );
};

export default QuizBox;
