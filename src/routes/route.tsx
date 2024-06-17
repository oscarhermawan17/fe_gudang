import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import SignUp from "../Pages/SignUpPage/SignUpPage"
// import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage"
// import HomePage from "../Pages/HomePage/HomePage"
// import ProtectedPage from "../Pages/ProtectedPage/ProtectedPage"

// Protected Route
// const protectedRoutes = [
//   { path: "/home", element: <HomePage /> },
//   { path: "/x", element: <>test</> },
// ]

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  // ...protectedRoutes.map((route) => ({
  //   path: route.path,
  //   element: <ProtectedPage />,
  //   children: [
  //     {
  //       path: "",
  //       element: route.element,
  //       errorElement: <ErrorPage />,
  //     },
  //   ],
  // })),
  // {
  //   path: '*',
  //   element: <NotFoundPage />,
  // },
])

export default router
