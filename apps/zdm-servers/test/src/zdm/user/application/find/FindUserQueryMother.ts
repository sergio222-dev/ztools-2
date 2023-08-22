import { FindUserQuery } from '../../../../../../src/zdm/user/application/find/FindUser.query';
import { IdMother } from '../../../../shared/domain/IdMother';

export class FindUserQueryMother {
  public static random(): FindUserQuery {
    return {
      id: IdMother.random(),
    };
  }
}
