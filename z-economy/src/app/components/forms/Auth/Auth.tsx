import { Input } from '@supabase/ui';
import styles from './Auth.module.scss';
import { Button } from '../../atoms/Button/Button';
import { SyntheticEvent, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router';
import { Typography } from '../../atoms/Typography/Typography';

// import { Input } from '../../atoms/Input/Input';

export const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_ANON_API_KEY);

const LOGIN_STATE = {
  SING_UP: Symbol(),
  SING_IN: Symbol(),
  FORGOT_PASSWORD: Symbol(),
};

export const Auth = () => {
  const [loginState, setLoginState] = useState(LOGIN_STATE.SING_IN);
  const loginReference = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const formSubmitHandler = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginReference.current === null) return;
    const loginData = new FormData(loginReference.current);

    if (LOGIN_STATE.SING_UP === loginState) {
      const { error } = await supabase.auth.signUp({
        email: loginData.get('email') as string,
        password: loginData.get('password') as string,
      });
      if (error) return alert(error.message);
      setLoginState(LOGIN_STATE.SING_IN);
      navigate('/');
      return;
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.get('email') as string,
        password: loginData.get('password') as string,
      });
      if (error) return alert(error.message);
      navigate('/');
    }
  };

  const singLinkHandler = () => {
    if (loginState === LOGIN_STATE.FORGOT_PASSWORD) {
      setLoginState(LOGIN_STATE.SING_IN);
      return;
    } else {
      switch (loginState) {
        case LOGIN_STATE.SING_UP: {
          setLoginState(LOGIN_STATE.SING_IN);
          break;
        }
        case LOGIN_STATE.SING_IN: {
          setLoginState(LOGIN_STATE.SING_UP);
          break;
        }
      }
    }
  };

  const forgotPasswordHandler = () => {
    setLoginState(LOGIN_STATE.FORGOT_PASSWORD);
  };

  const formSubmitPassResetHandler = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginReference.current === null) return;
    const loginData = new FormData(loginReference.current);
    const { error } = await supabase.auth.resetPasswordForEmail(loginData.get('email') as string, {
      redirectTo: 'http://localhost:5173/login',
    });
    if (error) return alert(error.message);
    alert('Password reset email sent!');
  };

  switch (loginState) {
    case LOGIN_STATE.SING_UP: {
      return (
        <form name="auth" className={styles.login_form} ref={loginReference} onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="email">
              <Typography> Email address </Typography>
            </label>
            <Input type="email" placeholder="Your email address" name="email" />
          </div>
          <div>
            <label htmlFor="password">
              <Typography> Password </Typography>
            </label>
            <Input type="password" placeholder="Your password" name="password" />
          </div>
          <div className="z_flex z_flex_jc_center">
            <Button type="submit" variant="primary" className={styles.submit_button}>
              <Typography> Sign up </Typography>
            </Button>
          </div>
          <div className={styles.login_links}>
            <a href="#" onClick={forgotPasswordHandler}>
              <Typography> Forgot password? </Typography>
            </a>
            <a href="#" onClick={singLinkHandler}>
              <Typography> Sign in </Typography>
            </a>
          </div>
        </form>
      );
    }
    case LOGIN_STATE.SING_IN: {
      return (
        <form name="auth" className={styles.login_form} ref={loginReference} onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="email">
              <Typography> Email address </Typography>
            </label>
            <Input type="email" placeholder="Your email address" name="email" />
          </div>
          <div>
            <label htmlFor="password">
              <Typography> Password </Typography>
            </label>
            <Input type="password" placeholder="Your password" name="password" />
          </div>
          <div className="z_flex z_flex_jc_center">
            <Button type="submit" variant="primary" className={styles.submit_button}>
              <Typography> Sign in </Typography>
            </Button>
          </div>
          <div className={styles.login_links}>
            <a href="#" onClick={forgotPasswordHandler}>
              <Typography> Forgot password? </Typography>
            </a>
            <a href="#" onClick={singLinkHandler}>
              <Typography> Sign up </Typography>
            </a>
          </div>
        </form>
      );
    }
    case LOGIN_STATE.FORGOT_PASSWORD: {
      return (
        <form
          name="auth"
          className={styles.login_form}
          ref={loginReference}
          onSubmit={formSubmitPassResetHandler}
        >
          <div>
            <label htmlFor="email">
              <Typography> Email address </Typography>
            </label>
            <Input type="email" placeholder="Your account email address" name="email" />
          </div>
          <div className="z_flex z_flex_jc_center">
            <Button type="submit" variant="primary" className={styles.submit_button}>
              <Typography> Reset password </Typography>
            </Button>
          </div>
          <div className={styles.login_links}>
            <a href="#" onClick={singLinkHandler}>
              <Typography> Sing in </Typography>
            </a>
          </div>
        </form>
      );
    }
  }
  return <></>;
};
