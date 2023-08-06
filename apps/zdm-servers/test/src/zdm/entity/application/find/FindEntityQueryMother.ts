import { IdMother } from '../../../../shared/domain/IdMother';
import { FindEntityQuery } from '../../../../../../src/zdm/entity/application/find/FindEntity.query';

export class FindEntityQueryMother {
  public static random(): FindEntityQuery {
    return {
      id: IdMother.random(),
    };
  }
}
