import { createContext } from 'react';
import { useCookies } from 'react-cookie';

import { LoginPayload, userLogin } from '@/utils/api/auth';
import { AuthContextType, AuthProviderProps } from './AuthContext.type';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['token', 'roles']);
  const token = cookie?.token;
  const roles = cookie?.roles;

  const login = async (values: LoginPayload) => {
    try {
      const res = await userLogin(values);
      setCookie('token', res.token, { path: '/' });
      setCookie('roles', res.roles, { path: '/' });
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
    removeCookie('roles', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ roles, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
