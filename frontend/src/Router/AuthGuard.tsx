import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: Boolean;
}
export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { signedIn, user } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate && user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
