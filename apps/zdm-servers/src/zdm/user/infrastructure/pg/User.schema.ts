import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { User } from '@zdm/user/domain/User.aggregate';
import { EntitySchema } from 'typeorm';
import {
  BaseEntitySchema,
  recordInfo,
} from '@shared/infrastructure/pg/schemasUtils';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';

export interface UserSchemaType extends BaseEntitySchema {
  id: string;
  username: string;
  password: string;
  email: string;
}

export const mapToAggregate = (entity: UserSchemaType) => {
  const id = new IdObject(entity.id);
  const username = new StringValueObject(entity.username);
  const password = new StringValueObject(entity.password);
  const email = new StringValueObject(entity.email);
  const created_at = new DateValueObject(entity.createdAt);
  const updated_at = new DateValueObject(entity.updatedAt);

  return User.RETRIEVE(id, username, email, password, created_at, updated_at);
};

export const mapToSchema = (entity: User): UserSchemaType => {
  return {
    id: entity.id.value,
    username: entity.name.value,
    password: entity.password.value,
    email: entity.email.value,
    createdAt: entity.createdAt.value,
    updatedAt: entity.updatedAt.value,
  };
};

export const UserSchema = new EntitySchema<UserSchemaType>({
  name: 'user',
  columns: {
    id: {
      type: 'text',
      primary: true,
    },
    username: {
      type: 'text',
      name: 'name',
    },
    password: {
      type: 'text',
    },
    email: {
      type: 'text',
    },
    ...recordInfo,
  },
});
