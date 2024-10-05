import { useNavigate, Outlet } from "react-router-dom"

import useAuth from '@/hooks/useAuth/useAuth';
import NavbarComponent from "@/Components/Navbar.component"

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    <>
      <NavbarComponent logout={handleLogout}/>
      <Outlet />
      Footer ini ada di MainLayout.tsx
    </>
  )
}

export default MainLayout
