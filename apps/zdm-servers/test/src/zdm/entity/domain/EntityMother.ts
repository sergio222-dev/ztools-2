import { Entity } from '../../../../../src/zdm/entity/domain/Entity.aggregate';
import { IdObject } from '../../../../../src/shared/domain/valueObject/IdObject';
import { StringValueObject } from '../../../../../src/shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '../../../../../src/shared/domain/valueObject/StringUndefinedValueObject';
import { DateValueObject } from '../../../../../src/shared/domain/valueObject/DateValueObject';
import { CreateEntityCommand } from '../../../../../src/zdm/entity/application/create/CreateEntity.command';
import { IdMother } from '../../../shared/domain/IdMother';
import { StringMother } from '../../../shared/domain/StringMother';

export class EntityMother {
  public static fromCommand(command: CreateEntityCommand) {
    return Entity.CREATE(
      new IdObject(command.id),
      new StringValueObject(command.name),
      new StringUndefinedValueObject(command.description),
      new StringUndefinedValueObject(command.parent_id),
      new IdObject(command.user_id),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }

  public static fromId(id: string) {
    return Entity.CREATE(
      new IdObject(id),
      new StringValueObject(StringMother.random()),
      new StringUndefinedValueObject(StringMother.random()),
      new StringUndefinedValueObject(StringMother.random()),
      new IdObject(IdMother.random()),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }
}
