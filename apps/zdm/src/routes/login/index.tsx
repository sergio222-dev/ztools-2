import { RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues } from '@modular-forms/qwik';
import type { IFormLogin, IFormLoginResponse } from '~/components/form/login';
import { component$ } from '@builder.io/qwik';
import { FormLogin, LoginSchema } from '~/components/form/login';
import { formAction$, zodForm$ } from '@modular-forms/qwik';
import { container } from '~/lib/main.module';

export const useLoginLoader = routeLoader$<InitialValues<IFormLogin>>(() => ({
  username: '',
  password: '',
}));

export const useLogin = formAction$<IFormLogin, IFormLoginResponse>(async (data, { cookie }) => {
  const signIn = container.resolve('signIn');
  try {
    const token = await signIn.execute({
      username: data.username,
      password: data.password,
    });
    cookie.set('token', token, {
      path: '/',
    });
    return {
      status: 'success',
      data: {
        token,
        username: 'Jaime',
      },
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.cause.message,
    };
  }
}, zodForm$(LoginSchema));

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  if (cookie.has('token')) {
    throw redirect(302, '/');
  }
};

export default component$(() => {
  const loader = useLoginLoader();
  const action = useLogin();

  return (
    <div>
      <FormLogin loader={loader} action={action} />
    </div>
  );
});
