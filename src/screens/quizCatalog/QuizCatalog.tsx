import './QuizCatalog.scss';
import SearchInput from '../../components/inputsComponents/searchInput/SearchInput';
import QuizBox from '../../components/quizBox/QuizBox';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InitialQuiz, QuizType } from '../../constants/globalTypes';
import ReactLoading from 'react-loading';
import { fakeApiCall } from '../../utils/fakeApiCall';

const QuizCatalog = () => {
  const navigate = useNavigate();
  const storedArray = JSON.parse(localStorage.getItem('quizArray') || '[]');

  const [quizArray, setQuizArray] = useState<QuizType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredQuizArray = quizArray.filter(quiz => {
    return quiz.data?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const saveQuizArray = (quizzes: QuizType[]) => {
    const filteredQuizzes = quizzes.filter(quiz => quiz.data); // Убираем пустые объекты
    localStorage.setItem('quizArray', JSON.stringify(filteredQuizzes));
  };

  useEffect(() => {
    setQuizArray(storedArray);
  }, [storedArray.length]);

  useEffect(() => {
    saveQuizArray(storedArray);
  }, []);

  const createQuiz = async () => {
    const quizId = uuidv4();
    const initialQuiz: InitialQuiz = {
      id: quizId,
    };
    const updatedArray = [...quizArray, initialQuiz];
    localStorage.setItem(`quizArray`, JSON.stringify(updatedArray));
    setIsLoading(true);
    await fakeApiCall(null, 1500);
    setIsLoading(false);
    navigate(`/quiz_create/${quizId}`);
  };

  if (isLoading) {
    return (
      <ReactLoading type={'bubbles'} color={'black'} height={50} width={50} />
    );
  }

  return (
    <div className="quizCatalogMainContainer">
      <div>
        <SearchInput
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <ActionIcon
          variant="light"
          radius="xl"
          aria-label="Settings"
          onClick={createQuiz}>
          <IconPlus />
        </ActionIcon>
      </div>
      <div>
        {filteredQuizArray.length ? (
          filteredQuizArray.map(quiz => (
            <QuizBox
              key={`quiz_box_${quiz.id}`}
              name={quiz.data?.name}
              quizId={quiz.id}
              setQuizArray={setQuizArray}
            />
          ))
        ) : (
          <div className="emptyQuizArray">Add your quiz</div>
        )}
      </div>
    </div>
  );
};

export default QuizCatalog;
