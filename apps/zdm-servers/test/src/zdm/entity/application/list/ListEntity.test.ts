import { suite, test } from '@testdeck/jest';
import { EntityUnitTestCase } from '../../EntityUnitTestCase';
import { ListEntityHandler } from '../../../../../../src/zdm/entity/application/list/ListEntityHandler';
import { ListEntity } from '../../../../../../src/zdm/entity/application/list/ListEntity';

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
    // test here
  }
}
