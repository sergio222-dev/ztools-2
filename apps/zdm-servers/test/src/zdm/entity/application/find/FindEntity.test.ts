import { EntityUnitTestCase } from '../../EntityUnitTestCase';
import { suite, test } from '@testdeck/jest';
import { EntityMother } from '../../domain/EntityMother';
import { FindEntityHandler } from '../../../../../../src/zdm/entity/application/find/FindEntity.handler';
import { FindEntity } from '../../../../../../src/zdm/entity/application/find/FindEntity';
import { FindEntityQueryMother } from './FindEntityQueryMother';

@suite('Entity Find')
class FindEntityTest extends EntityUnitTestCase {
  private _handler: FindEntityHandler;
  private _service: FindEntity;

  get service(): FindEntity {
    if (!this._service) {
      this._service = new FindEntity(this.repository);
    }

    return this._service;
  }

  get handler(): FindEntityHandler {
    if (!this._handler) {
      this._handler = new FindEntityHandler(this.service);
    }

    return this._handler;
  }

  @test('should return entity')
  async it_should_return_entity() {
    const query = FindEntityQueryMother.random();
    const entity = EntityMother.fromId(query.id);
    const returnValue = async () => entity;
    const returnValueMock = returnValue();
    this.repository.find.mockReturnValue(returnValueMock);

    const result = await this.handler.execute(query);
    this.shouldReturnEntity(entity, result);
  }
}
