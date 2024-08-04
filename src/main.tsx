import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { CookiesProvider } from "react-cookie";

import { AuthProvider } from "@/context/AuthContext"
import router from "./routes/route"
import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
