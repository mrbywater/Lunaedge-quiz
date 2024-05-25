import React from 'react';
import './styles/style.scss';
// import QuizCatalog from './screens/quizCatalog/QuizCatalog';
// import Quiz from './screens/quiz/Quiz';
// import Results from './screens/results/Results';
import QuizCreate from './screens/quizCreate/QuizCreate';

function App() {
  return (
    <div className="mainContainer">
      <QuizCreate />
    </div>
  );
}

export default App;
