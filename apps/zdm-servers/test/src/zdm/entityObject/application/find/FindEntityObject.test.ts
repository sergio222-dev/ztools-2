import { EntityObjectUnitTestCase } from '../../EntityObjectUnitTestCase';
import { suite, test } from '@testdeck/jest';
import { EntityObjectMother } from '../../domain/EntityObjectMother';
import { FindEntityObjectHandler } from '../../../../../../src/zdm/entityObject/application/find/FindEntityObject.handler';
import { FindEntityObject } from '../../../../../../src/zdm/entityObject/application/find/FindEntityObject';
import { FindEntityObjectQueryMother } from './FindEntityObjectQueryMother';

@suite('EntityObject Find')
class FindEntityObjectTest extends EntityObjectUnitTestCase {
  private _handler: FindEntityObjectHandler;
  private _service: FindEntityObject;

  get service(): FindEntityObject {
    if (!this._service) {
      this._service = new FindEntityObject(this.repository);
    }

    return this._service;
  }

  get handler(): FindEntityObjectHandler {
    if (!this._handler) {
      this._handler = new FindEntityObjectHandler(this.service);
    }

    return this._handler;
  }

  @test('should return entity object')
  async it_should_return_entity_object() {
    const query = FindEntityObjectQueryMother.random();
    const entityObject = EntityObjectMother.fromId(query.id);
    const returnValue = async () => entityObject;
    const returnValueMock = returnValue();
    this.setReturnValueRepository('find', returnValueMock);

    const result = await this.handler.execute(query);
    this.shouldReturnEntityObject(entityObject, result);
  }
}
