import { useContext } from 'react';

import { AuthContextType, AuthContext } from '@/context/AuthContext';

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useFakeAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
