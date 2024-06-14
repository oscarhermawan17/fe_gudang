import {
  createBrowserRouter,
} from "react-router-dom";

import App from '../App'
import SignUp from '../Pages/SignUpPage/SignUpPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  }, {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router