import React from 'react';
import './styles/style.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import QuizCatalog from './screens/quizCatalog/QuizCatalog';
import Quiz from './screens/quiz/Quiz';
import Results from './screens/results/Results';
import QuizCreate from './screens/quizCreate/QuizCreate';
import ErrorPage from './screens/errorPage/ErrorPage';

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
    },
    {
      path: '/quiz_create/:quizId',
      element: <QuizCreate />,
    },
    {
      path: '/results',
      element: <Results />,
    },
  ]);

  return (
    <div className="mainContainer">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
