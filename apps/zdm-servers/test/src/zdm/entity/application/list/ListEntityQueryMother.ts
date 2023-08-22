import { ListEntityQuery } from '../../../../../../src/zdm/entity/application/list/ListEntity.query';

export const ListEntityQueryMother = {
  create(): ListEntityQuery {
    return new ListEntityQuery();
  },
};
