import { Navigate, Outlet } from "react-router-dom"
import useAuth from '@/hooks/useAuth/useAuth';

const ProtectedPage = () => {
  const { token } = useAuth();

  console.log('token', token)

  return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedPage
