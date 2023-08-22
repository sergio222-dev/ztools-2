import { IdObject } from '../../../../../src/shared/domain/valueObject/IdObject';
import { StringValueObject } from '../../../../../src/shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '../../../../../src/shared/domain/valueObject/StringUndefinedValueObject';
import { DateValueObject } from '../../../../../src/shared/domain/valueObject/DateValueObject';
import { CreateEntityObjectCommand } from '../../../../../src/zdm/entityObject/application/create/CreateEntityObject.command';
import { EntityObject } from '../../../../../src/zdm/entityObject/domain/EntityObject.aggregate';
import { StringMother } from '../../../shared/domain/StringMother';
import { IdMother } from '../../../shared/domain/IdMother';

export class EntityObjectMother {
  public static fromCommand(command: CreateEntityObjectCommand) {
    return EntityObject.CREATE(
      new IdObject(command.id),
      new StringValueObject(command.name),
      new StringValueObject(command.entity_id),
      new StringUndefinedValueObject(command.description),
      new StringUndefinedValueObject(command.image_link),
      new IdObject(command.user_id),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }

  public static fromId(id: string) {
    return EntityObject.CREATE(
      new IdObject(id),
      new StringValueObject(StringMother.random()),
      new IdObject(IdMother.random()),
      new StringValueObject(StringMother.random()),
      new StringValueObject(IdMother.random()),
      new IdObject(IdMother.random()),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }
}
