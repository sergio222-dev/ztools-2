import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@utils/useAuth';

export function PrivateOutlet() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
