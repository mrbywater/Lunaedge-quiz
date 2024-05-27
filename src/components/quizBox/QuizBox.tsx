import './QuizBox.scss';
import { IconX, IconPencil } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { QuizType } from '../../constants/globalTypes';

type QuizBoxProps = {
  name: string;
  quizId: string;
  setQuizArray: (value: QuizType[]) => void;
};

const QuizBox = (props: QuizBoxProps) => {
  const { name, quizId, setQuizArray } = props;
  const navigate = useNavigate();

  const storedArray = JSON.parse(localStorage.getItem('quizArray') || '[]');

  const deleteDataById = () => {
    const updatedArray = storedArray.filter(
      (item: QuizType) => item.id !== quizId,
    );
    localStorage.setItem('quizArray', JSON.stringify(updatedArray));
    setQuizArray(updatedArray);
  };

  const editQuiz = () => navigate(`/quiz_create/${quizId}`);

  return (
    <div className="quizBoxMainContainer">
      <Link to={`/quiz/${quizId}`}>
        <div>{name}</div>
      </Link>
      <div>
        <IconPencil stroke={1.5} onClick={editQuiz} />
        <IconX stroke={1.5} onClick={deleteDataById} />
      </div>
    </div>
  );
};

export default QuizBox;
