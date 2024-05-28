export interface AnswerProps {
  answersArr: string[];
  deleteCross?: boolean;
  deleteAnswer?: (answer: string) => () => void;
}

export interface MultiProps extends AnswerProps {
  setRightAnswer?: (answer: string[]) => void;
  rightAnswer?: string[];
}

export interface SingleProps extends AnswerProps {
  setRightAnswer?: (answer: string) => void;
  rightAnswer?: string;
}
