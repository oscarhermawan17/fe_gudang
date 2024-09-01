import { createBrowserRouter } from "react-router-dom"

import MainLayout from "@/Pages/MainLayout/MainLayout"
import SignInPage from "../Pages/SignInPage/SignInPage"
import SignUp from "../Pages/SignUpPage/SignUpPage"
// import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage"
import HomePage from "../Pages/HomePage/HomePage"
import ProtectedPage from "../Pages/ProtectedPage/ProtectedPage"
import ProductPage from "@/Pages/ProductPage/ProductPage"

//Protected Route
const protectedRoutes = [{
    path: "/",
    element: <ProtectedPage />,
    children: [{
        path: "/", 
        element: <MainLayout />,
        children: [{
          path: "/",
          element: <HomePage />
        },
        {
          path: "/product", 
          element: <ProductPage />
        },]
      },
    ],
  },
]

const router = createBrowserRouter([

  {
    path: "/login", // Refactor this soon I
    element: <SignInPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  ...protectedRoutes.map((route) => ({
    path: route.path,
    element: route.element,
    children: route.children
  })),
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
