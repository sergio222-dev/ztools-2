import { IdMother } from '../../../../shared/domain/IdMother';
import { FindEntityObjectQuery } from '../../../../../../src/zdm/entityObject/application/find/FindEntityObject.query';

export class FindEntityObjectQueryMother {
  public static random(): FindEntityObjectQuery {
    return {
      id: IdMother.random(),
    };
  }
}
