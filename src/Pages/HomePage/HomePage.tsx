import { useNavigate } from "react-router-dom"

import useAuth from '@/hooks/useAuth/useAuth';
import NavbarComponent from "@/Components/Navbar.component"



function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  return <NavbarComponent logout={handleLogout}/>
}

export default HomePage
