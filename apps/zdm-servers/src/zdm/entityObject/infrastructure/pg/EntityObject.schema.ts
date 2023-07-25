import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';
import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { EntitySchema } from 'typeorm';

export interface EntityObjectSchemaType {
  id: string;
  name: string;
  entity_id: string;
  description?: string;
  image_link?: string;
}

export const mapToAggregate = (entity: EntityObjectSchemaType) => {
  const id = new IdObject(entity.id);
  const name = new StringValueObject(entity.name);
  const description = new StringUndefinedValueObject(entity.description);
  const image_link = new StringUndefinedValueObject(entity.image_link);
  const entity_id = new StringValueObject(entity.entity_id);

  return EntityObject.RETRIEVE(id, name, entity_id, description, image_link);
};

export const mapToSchema = (entity: EntityObject): EntityObjectSchemaType => {
  return {
    id: entity.id.value,
    name: entity.name.value,
    entity_id: entity.entity_id.value,
    description: entity.description.value,
    image_link: entity.image_link.value,
  };
};

export const EntityObjectSchema = new EntitySchema<EntityObjectSchemaType>({
  name: 'entity',
  columns: {
    id: {
      type: 'text',
      primary: true,
    },
    name: {
      type: 'text',
    },
    entity_id: {
      type: 'text',
    },
    description: {
      type: 'text',
    },
    image_link: {
      type: 'text',
    },
  },
});