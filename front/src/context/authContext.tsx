import { authApi } from '@api';
import { ROUTES } from '@constants/paths';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type IAuthcontext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (config: { email: string; password: string }) => Promise<void>;
  register: (config: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  check: () => Promise<boolean>;
};

const AuthContext = createContext<IAuthcontext>({
  isAuthenticated: false,
  isLoading: false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  check: () => Promise.resolve(false),
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();

  const check = async () => {
    const data = await authApi.check();
    setIsAuthenticated(data.status === 200);
    setIsLoading(false);
    return data.status === 200;
  };

  const login = async (vals: { email: string; password: string }) => {
    setIsLoading(true);

    const data = await authApi.login(vals);
    if (data.status === 200) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);

    navigator(ROUTES.RESTAURANTS);
  };

  const register = async (vals: { email: string; password: string }) => {
    setIsLoading(true);
    const regRes = await authApi.register(vals);
    if (regRes.status === 200) {
      login(vals);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await authApi.logout();
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  useEffect(() => {
    check().then((data) => {
      if (data) authApi.refresh();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout, check }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
