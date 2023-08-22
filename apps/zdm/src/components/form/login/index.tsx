import { component$, useContext, useTask$ } from '@builder.io/qwik';
import { useForm, zodForm$ } from '@modular-forms/qwik';
import Input from '~/components/atom/Input/Input';
import type { CommonFormProperties } from '~/lib/shared/application/FormLoaderProperty';
import { z } from '@builder.io/qwik-city';
import { UserContext } from '~/lib/user/application/adapters/context';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export interface IFormLogin extends z.infer<typeof LoginSchema> {}

export interface IFormLoginResponse {
  username: string;
  token: string;
}

interface FormLoginProperties extends CommonFormProperties<IFormLogin, IFormLoginResponse> {}

export const FormLogin = component$<FormLoginProperties>(({ loader, action, ...props }) => {
  const [form, { Form, Field }] = useForm<IFormLogin, IFormLoginResponse>({
    loader,
    validate: zodForm$(LoginSchema),
    action,
  });

  const userStore = useContext(UserContext);

  useTask$(({ track }) => {
    track(() => form.response.status);
    if (form.response.status === 'success') {
      const { data } = form.response;
      userStore.username = data?.username as string;
      userStore.token = data?.token as string;
    }
  });

  return (
    <Form {...props}>
      <div>{form.response.message}</div>
      <Field name="username">
        {(field, props) => (
          <>
            <label for="username" class="form-label">
              Username
            </label>
            <Input {...props} value={field.value} id="username" type="text" />
            {field.error}
          </>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <>
            <label for="password" class="form-label">
              Password
            </label>
            <Input {...props} value={field.value} id="password" type="password" />
          </>
        )}
      </Field>
      <button type="submit" class="btn btn-primary">
        {' '}
        login
      </button>
    </Form>
  );
});
