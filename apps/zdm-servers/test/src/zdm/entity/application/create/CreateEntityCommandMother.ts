import { CreateEntityCommand } from '../../../../../../src/zdm/entity/application/create/CreateEntity.command';
import { IdMother } from '../../../../shared/domain/IdMother';
import { StringMother } from '../../../../shared/domain/StringMother';

export class CreateEntityCommandMother {
  public static random(): CreateEntityCommand {
    return {
      id: IdMother.random(),
      name: StringMother.random(),
      description: StringMother.random(),
      parent_id: StringMother.random(),
      user_id: IdMother.random(),
    };
  }
}
