import { FindByUserNameResponse } from '../../../../../../src/zdm/user/application/findByUserName/FindByUserNameResponse';
import { StringMother } from '../../../../shared/domain/StringMother';
import { IdMother } from '../../../../shared/domain/IdMother';

export const FindByUserNameResponseMother = {
  create(username: string): FindByUserNameResponse {
    return new FindByUserNameResponse(
      IdMother.random(),
      username,
      StringMother.random(),
    );
  },
};
