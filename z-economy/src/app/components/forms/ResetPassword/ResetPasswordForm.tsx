import styles from './ResetPasswordForm.module.scss';
import { Typography } from '@atoms/Typography/Typography';
import { Input } from '@supabase/ui';
import { Button } from '@atoms/Button/Button';
import { SyntheticEvent, useRef } from 'react';
import { supabase } from '../Auth/AuthForm';
import { useNavigate } from 'react-router';

export const ResetPasswordForm = () => {
  const loginReference = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const formSubmitHandler = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginReference.current === null) return;
    const loginData = new FormData(loginReference.current);
    const { data, error } = await supabase.auth.updateUser({ password: loginData.get('password') as string });
    if (data) alert('Password updated successfully!');
    if (error) return alert('There was an error updating your password.');
    navigate('/');
  };

  return (
    <form name="auth" className={styles.login_form} ref={loginReference} onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="password">
          <Typography> Password reset </Typography>
        </label>
        <Input type="password" placeholder="Your new password" name="password" />
      </div>
      <div className="z_flex z_flex_jc_center">
        <Button type="submit" variant="primary" className={styles.submit_button}>
          <Typography> Set new password </Typography>
        </Button>
      </div>
    </form>
  );
};
