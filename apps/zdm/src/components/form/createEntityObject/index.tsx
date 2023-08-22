import { z } from '@builder.io/qwik-city';
import type { CommonFormProperties } from '~/lib/shared/application/FormLoaderProperty';
import type { QRL } from '@builder.io/qwik';
import { component$, useTask$ } from '@builder.io/qwik';
import { reset, useForm, zodForm$ } from '@modular-forms/qwik';
import Input from '~/components/atom/Input/Input';
import Select from '~/components/atom/Select/Select';
import type { EntityAggregate } from '~/lib/entity/domain/Entity.aggregate';
import Button from '~/components/atom/Button/Button';

export const EntityObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  entity_id: z.string(),
  image_link: z.string().optional(),
});

export interface IFormCreateEntityObject extends z.infer<typeof EntityObjectSchema> {}

interface FormCreateEntityObjectProperties extends CommonFormProperties<IFormCreateEntityObject> {
  entities: EntityAggregate[];
  // onSubmitComplete$: QRL<() => void>;
}

export const FormCreateEntityObject = component$<FormCreateEntityObjectProperties>(
  ({
    loader,
    entities,
    // onSubmitComplete$,
    action,
    ...props
  }) => {
    const [form, { Form, Field }] = useForm<IFormCreateEntityObject>({
      loader,
      action,
      validate: zodForm$(EntityObjectSchema),
    });

    useTask$(({ track }) => {
      track(() => form.response.status);
      if (form.response.status === 'success') {
        reset(form);
        // void onSubmitComplete$();
      }
    });

    return (
      <Form {...props}>
        <Field name="name">
          {(field, props) => (
            <>
              <label for="name" class="form-label">
                Name
              </label>
              <Input {...props} value={field.value} id="name" type="text" />
              <div>{field.error}</div>
            </>
          )}
        </Field>
        <Field name="description">
          {(field, props) => (
            <>
              <label for="description" class="form-label">
                Description
              </label>
              <Input {...props} value={field.value} id="description" type="text" />
              <div>{field.error}</div>
            </>
          )}
        </Field>
        <Field name="entity_id">
          {(field, props) => (
            <>
              <label for="entity_id" class="form-label">
                Entity
              </label>
              <Select {...props} value={field.value} id="entity_id">
                {entities.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Select>
              <div>{field.error}</div>
            </>
          )}
        </Field>
        <Field name="image_link">
          {(field, props) => (
            <>
              <label for="image_link" class="form-label">
                Image Link
              </label>
              <Input {...props} value={field.value} id="image_link" type="text" />
              <div>{field.error}</div>
            </>
          )}
        </Field>
        <Button type="submit">Enviar</Button>
      </Form>
    );
  },
);
