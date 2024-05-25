import './QuizCreate.scss';
import { Input } from '@mantine/core';
import DropDown from '../../components/inputsComponents/dropDown/DropDown';
import { ANSWER_OPTIONS } from '../../constants';
import MultiAnswer from '../../components/quizAnswers/multiAnswer/MultiAnswer';

const QuizCreate = () => {
  return (
    <div className="quizCreateMainContainer">
      <div>
        <Input.Wrapper label="Title" description="" error="">
          <Input placeholder="Add title of quiz" />
        </Input.Wrapper>
      </div>
      <div>
        <DropDown
          data={ANSWER_OPTIONS}
          label="Answer option"
          placeholder="Choose the answer option"
          defaultValue={'Single'}
        />
      </div>
      <div>
        <MultiAnswer answersArr={ANSWER_OPTIONS} />
      </div>
    </div>
  );
};

export default QuizCreate;
