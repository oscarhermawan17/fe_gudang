import { Navigate, Outlet } from "react-router-dom"
import useAuth from '@/hooks/useAuth/useAuth';

const ProtectedPage = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedPage
