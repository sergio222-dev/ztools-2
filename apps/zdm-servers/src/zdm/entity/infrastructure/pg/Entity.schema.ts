import { EntitySchema as PgSchema } from 'typeorm';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';
import {
  OwnershipEntitySchema,
  ownershipInfo,
} from '@shared/infrastructure/pg/schemasUtils';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { NumberValueObject } from '@shared/domain/valueObject/NumberValueObject';

export interface EntitySchemaType extends OwnershipEntitySchema {
  name: string;
  order: number;
  description?: string;
  parent_id?: string;
  user_id: string;
}

export const mapToAggregate = (entity: EntitySchemaType) => {
  const id = new IdObject(entity.id);
  const name = new StringValueObject(entity.name);
  const order = new NumberValueObject(entity.order);
  const description = new StringUndefinedValueObject(entity.description);
  const parent_id = new StringUndefinedValueObject(entity.parent_id);
  const created_at = new DateValueObject(entity.createdAt);
  const updated_at = new DateValueObject(entity.createdAt);
  const user_id = new IdObject(entity.user_id);

  return Entity.RETRIEVE(
    id,
    name,
    order,
    description,
    parent_id,
    user_id,
    created_at,
    updated_at,
  );
};

export const mapToSchema = (entity: Entity): EntitySchemaType => {
  return {
    id: entity.id.value,
    name: entity.name.value,
    order: entity.order.value,
    description: entity.description.value,
    parent_id: entity.parent_id.value,
    user_id: entity.user_id.value,
    createdAt: entity.createdAt.value,
    updatedAt: entity.updatedAt.value,
  };
};

export const EntitySchema = new PgSchema<EntitySchemaType>({
  name: 'entity',
  // relationIds: {
  //   parent_id: {
  //     relationName: 'id',
  //     alias: 'entity',
  //   },
  // },
  columns: {
    id: {
      type: 'text',
      primary: true,
    },
    name: {
      type: 'text',
    },
    order: {
      type: 'integer',
    },
    description: {
      type: 'text',
    },
    parent_id: {
      type: 'text',
    },
    ...ownershipInfo,
  },
});
