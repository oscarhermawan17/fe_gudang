import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppState } from "../../types.ts";

const ProtectedPage = () => {
  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  if (!userInfo) {
    return <Navigate to="/login" />
  }

  const isAuthenticated: boolean = Object.hasOwn(userInfo, "token")

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedPage
