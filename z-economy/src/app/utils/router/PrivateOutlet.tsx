import { Navigate, Outlet } from 'react-router';

export function PrivateOutlet() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

// TODO: move to utils
export function useAuth() {
  const token = localStorage.getItem('sb-vglfdkapzwnkxsdehqsv-auth-token');
  return token !== null;
}
