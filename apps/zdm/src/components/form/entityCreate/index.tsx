import type { QRL } from '@builder.io/qwik';
import { $, component$ } from '@builder.io/qwik';
import type { SubmitHandler } from '@modular-forms/qwik';
import { required, useForm } from '@modular-forms/qwik';
import { useEntityCreateFormLoader } from '~/routes/entity/create';
import Input from '~/components/atom/Input/Input';
import type { FieldValues } from '@modular-forms/qwik/dist/types/types';

export interface IFormEntityCreate extends FieldValues {
  name: string;
  description: string;
  entityParent: string;
}

export const FormEntityCreate = component$(() => {
  const [, { Form, Field }] = useForm<IFormEntityCreate>({
    loader: useEntityCreateFormLoader(),
  });

  const handleSubmit: QRL<SubmitHandler<IFormEntityCreate>> = $((values, event) => {
    console.log(values);
    console.log(event);
  });

  return (
    <Form onSubmit$={handleSubmit}>
      <Field validate={[required('Name is required')]} name="name">
        {(field, props) => (
          <>
            <label for="entityName" class="form-label">
              Name
            </label>
            <Input {...props} value={field.value} id="entityName" type="text" />
            {field.error}
          </>
        )}
      </Field>
      <Field name="description">
        {(field, props) => (
          <>
            <label for="entityDescription" class="form-label">
              Description
            </label>
            <Input {...props} value={field.value} id="entityDescription" type="text" />
          </>
        )}
      </Field>
      <button type="submit">Enviar</button>
    </Form>
  );
});
