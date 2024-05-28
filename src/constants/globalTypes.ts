export type Question = {
  question: string;
  mark: number;
  typeOfQuestion: string;
  answers: string[];
  rightAnswers: string[] | string;
};

export type QuizResultData = {
  mark: number;
  question: string;
  rightAnswers: string | string[];
  yourAnswer: string | string[];
};

export type QuizResult = {
  data: QuizResultData;
  totalScore: string;
  time: string;
  id: string;
};

export interface InitialQuiz {
  id: string;
}

export interface QuizType extends InitialQuiz {
  data: {
    name: string;
    questions: Question;
    results: QuizResult[];
  };
}
