import React from 'react';
import './styles/style.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import QuizCatalog from './screens/quizCatalog/QuizCatalog';
import Quiz from './screens/quiz/Quiz';
import Results from './screens/results/Results';
import QuizCreate from './screens/quizCreate/QuizCreate';
import ErrorPage from './screens/errorPage/ErrorPage';
import ResultsList from './screens/resultsList/ResultsList';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <QuizCatalog />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/quiz/:quizId',
      element: <Quiz />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/quiz_create/:quizId',
      element: <QuizCreate />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/results/:quizId',
      element: <ResultsList />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/results/:quizId/:resultId',
      element: <Results />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="mainContainer">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
