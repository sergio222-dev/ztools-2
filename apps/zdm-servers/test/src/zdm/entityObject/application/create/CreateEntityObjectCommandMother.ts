import { IdMother } from '../../../../shared/domain/IdMother';
import { StringMother } from '../../../../shared/domain/StringMother';
import { CreateEntityObjectCommand } from '../../../../../../src/zdm/entityObject/application/create/CreateEntityObject.command';

export class CreateEntityObjectCommandMother {
  public static random(): CreateEntityObjectCommand {
    return {
      id: IdMother.random(),
      name: StringMother.random(),
      description: StringMother.random(),
      entity_id: StringMother.random(),
      image_link: StringMother.random(),
      user_id: IdMother.random(),
    };
  }
}
