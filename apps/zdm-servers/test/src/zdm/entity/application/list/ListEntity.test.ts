import { suite, test } from '@testdeck/jest';
import { EntityUnitTestCase } from '../../EntityUnitTestCase';
import { ListEntityHandler } from '../../../../../../src/zdm/entity/application/list/ListEntityHandler';
import { ListEntity } from '../../../../../../src/zdm/entity/application/list/ListEntity';
import { EntityMother } from '../../domain/EntityMother';

@suite('Entity Find')
class ListEntityTest extends EntityUnitTestCase {
  private _handler: ListEntityHandler;
  private _service: ListEntity;

  get service(): ListEntity {
    if (!this._service) {
      this._service = new ListEntity(this.repository);
    }

    return this._service;
  }

  get handler(): ListEntityHandler {
    if (!this._handler) {
      this._handler = new ListEntityHandler(this.service);
    }

    return this._handler;
  }

  @test('it should list entities')
  async it_should_list_entities() {
    const quantity = 1;
    const list = EntityMother.randomList(quantity);

    const returnValue = async () => list;
    const returnValueMock = returnValue();
    this.setReturnValueRepository('findAll', returnValueMock);

    const result = await this.handler.execute();
    this.shouldFindEntities();
    this.assertEntityList(list, result);
  }
}
