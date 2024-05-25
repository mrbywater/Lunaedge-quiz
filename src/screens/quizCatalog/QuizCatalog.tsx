import './QuizCatalog.scss';
import SearchInput from '../../components/inputsComponents/searchInput/SearchInput';
import QuizBox from '../../components/quizBox/QuizBox';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const test = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur corporis dolores, dolorum ea earum esse ex, expedita laudantium minus odio perferendis quae quis repellendus sunt ullam ut vero vitae?',
  '2',
  '3',
  '4',
  '5',
];

const QuizCatalog = () => {
  return (
    <div className="quizCatalogMainContainer">
      <div>
        <SearchInput />
        <ActionIcon variant="light" radius="xl" aria-label="Settings">
          <IconPlus />
        </ActionIcon>
      </div>
      <div>
        {test.map(quizBox => (
          <QuizBox key={`quiz_box_${quizBox}`} name={quizBox} />
        ))}
      </div>
    </div>
  );
};

export default QuizCatalog;
