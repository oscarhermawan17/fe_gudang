import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import SignUp from "../Pages/SignUpPage/SignUpPage"
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import HomePage from "../Pages/HomePage/HomePage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
])

export default router
