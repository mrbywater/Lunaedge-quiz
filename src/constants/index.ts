import { Question } from './globalTypes';

export const ANSWER_OPTIONS = ['Single', 'Multiply', 'Text'];

export const INITIAL_QUESTION: Question = {
  question: '',
  mark: 1,
  typeOfQuestion: 'Single',
  answers: [],
  rightAnswers: [],
};
