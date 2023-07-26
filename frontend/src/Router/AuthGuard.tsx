import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: Boolean;
}
export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to="/ogin" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
