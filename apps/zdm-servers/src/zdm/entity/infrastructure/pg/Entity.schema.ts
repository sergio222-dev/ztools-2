import { EntitySchema as PgSchema } from 'typeorm';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';

export interface EntitySchemaType {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
}

export const mapToAggregate = (entity: EntitySchemaType) => {
  const id = new IdObject(entity.id);
  const name = new StringValueObject(entity.name);
  const description = new StringUndefinedValueObject(entity.description);
  const parent_id = new StringUndefinedValueObject(entity.parent_id);

  return Entity.RETRIEVE(id, name, description, parent_id);
};

export const mapToSchema = (entity: Entity): EntitySchemaType => {
  return {
    id: entity.id.value,
    name: entity.name.value,
    description: entity.description.value,
    parent_id: entity.parent_id.value,
  };
};

export const EntitySchema = new PgSchema<EntitySchemaType>({
  name: 'entity',
  columns: {
    id: {
      type: 'text',
      primary: true,
    },
    name: {
      type: 'text',
    },
    description: {
      type: 'text',
    },
  },
});
