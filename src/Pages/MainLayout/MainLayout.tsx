import { useNavigate, Outlet } from "react-router-dom"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import useAuth from '@/hooks/useAuth/useAuth';
import NavbarComponent from "@/Components/Navbar.component"
import FooterComponent from "@/Components/Footer.component"

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  status: {
    danger: 'red'
  },
});

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    <ThemeProvider theme={theme}>
      <NavbarComponent logout={handleLogout}/>
      <Outlet />
      {/* <FooterComponent /> */}
    </ThemeProvider>
  )
}

export default MainLayout
