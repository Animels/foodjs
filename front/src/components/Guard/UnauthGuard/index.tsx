import { Loader } from '@components/core/Loader';
import { ROUTES } from '@constants/paths';
import { useAuth } from '@context';
import { Navigate, Outlet } from 'react-router';

const UnauthGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return isAuthenticated ? <Navigate to={ROUTES.RESTAURANTS} /> : <Outlet />;
};

export { UnauthGuard };
