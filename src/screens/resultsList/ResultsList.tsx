import './ResultsList.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QuizType } from '../../constants/globalTypes';
import { Button } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { RANK_COLORS } from '../../constants';

const ResultsList = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const storedArray = JSON.parse(localStorage.getItem('quizArray') || '[]');
  const quiz = storedArray.find((item: QuizType) => item.id === quizId);
  const results = quiz.data && quiz.results;

  const goToResults = (id: number) => () =>
    navigate(`/results/${quizId}/${id}`);
  const compareResults = (a: any, b: any) => {
    if (a.totalScore !== b.totalScore) {
      return b.totalScore - a.totalScore;
    } else {
      return a.time.localeCompare(b.time);
    }
  };

  results.sort(compareResults);

  return (
    <div className="ResultsListMainContainer">
      <div>
        <div>
          <span>Place</span>
          <span>Total score</span>
          <span>Time</span>
        </div>
        {results.map((item: any, index: number) => (
          <div key={`rank_${index}`} onClick={goToResults(item.id)}>
            <span style={{ color: RANK_COLORS[index] }}>{index + 1}</span>
            <span>{(item.totalScore + '').slice(0, 5)}%</span>
            <span>{item.time}</span>
          </div>
        ))}
      </div>
      <Link to={'/'}>
        <Button rightSection={<IconArrowBackUp size={18} />}>Back</Button>
      </Link>
    </div>
  );
};

export default ResultsList;
