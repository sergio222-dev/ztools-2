import type { QRL } from '@builder.io/qwik';
import { component$, useTask$ } from '@builder.io/qwik';
import { reset, useForm, zodForm$ } from '@modular-forms/qwik';
import Input from '~/components/atom/Input/Input';
import type { CommonFormProperties } from '~/lib/shared/application/FormLoaderProperty';
import { z } from '@builder.io/qwik-city';
import Button from '~/components/atom/Button/Button';
import type { EntityAggregate } from '~/lib/entity/domain/Entity.aggregate';
import Select from '~/components/atom/Select/Select';

export const EntityCreateSchema = z.object({
  name: z.string().min(1, 'Should be more than 1 character').max(20),
  description: z.string().min(1).max(200),
  entityParent: z.string(),
});

export interface IFormEntityCreate extends z.infer<typeof EntityCreateSchema> {}

interface FormEntityCreateProperties extends CommonFormProperties<IFormEntityCreate> {
  entities: EntityAggregate[];
  onSubmitComplete$: QRL<() => void>;
}

export const FormEntityCreate = component$<FormEntityCreateProperties>(
  ({ entities, onSubmitComplete$, loader, action, ...props }) => {
    const [form, { Form, Field }] = useForm<IFormEntityCreate>({
      loader,
      action,
      validate: zodForm$(EntityCreateSchema),
    });

    useTask$(({ track }) => {
      track(() => form.response.status);
      if (form.response.status === 'success') {
        reset(form);
        void onSubmitComplete$();
      }
    });

    return (
      <Form {...props}>
        <Field name="name">
          {(field, props) => (
            <>
              <label for="entityName" class="form-label">
                Name
              </label>
              <Input {...props} value={field.value} id="entityName" type="text" required />
              <div>{field.error}</div>
            </>
          )}
        </Field>
        <Field name="description">
          {(field, props) => (
            <>
              <label for="entityDescription" class="form-label">
                Description
              </label>
              <Input {...props} value={field.value} id="entityDescription" type="text" required />
              <div>{field.error}</div>
            </>
          )}
        </Field>
        <Field name="entityParent">
          {(field, props) => (
            <>
              <label>Parent Id</label>
              <Select {...props} value={field.value}>
                <option value={''}>None</option>
                {entities.map(entity => (
                  <option key={entity.id} value={entity.id}>
                    {entity.name}
                  </option>
                ))}
              </Select>
            </>
          )}
        </Field>
        <Button class="btn-primary" loading={form.submitting} type="submit">
          Enviar
        </Button>
      </Form>
    );
  },
);
