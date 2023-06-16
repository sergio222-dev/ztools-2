import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '@utils/useAuth';
import { Auth, supabase } from '../components/forms/Auth/Auth';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange(event => {
      if (event == 'PASSWORD_RECOVERY') {
        navigate('/reset-password');
      }
    });
  }, []);

  return auth ? (
    <Navigate to="/" />
  ) : (
    <div className="z_flex z_flex_jc_center">
      <Auth />
    </div>
  );
};
