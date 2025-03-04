import { Loader } from '@components';
import { useAuth } from '@context';
import { ROUTES } from 'pages/routes';
import { Navigate, Outlet } from 'react-router';

const UnauthGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;


  return isAuthenticated ? <Navigate to={ROUTES.restaurants} /> : <Outlet />;
};

export { UnauthGuard };
