import { EntityObjectUnitTestCase } from '../../EntityObjectUnitTestCase';
import { suite, test } from '@testdeck/jest';
import { CreateEntityObjectHandler } from '../../../../../../src/zdm/entityObject/application/create/CreateEntityObject.handler';
import { EntityObjectMother } from '../../domain/EntityObjectMother';
import { CreateEntityObjectCommandMother } from './CreateEntityObjectCommandMother';
import { CreateEntityObject } from '../../../../../../src/zdm/entityObject/application/create/CreateEntityObject';

@suite('Entity Object create unit test case')
export class CreateEntityObjectTest extends EntityObjectUnitTestCase {
  private _handler: CreateEntityObjectHandler;
  private _service: CreateEntityObject;

  get service(): CreateEntityObject {
    if (!this._service) {
      this._service = new CreateEntityObject(this.repository);
    }

    return this._service;
  }

  get handler(): CreateEntityObjectHandler {
    if (!this._handler) {
      this._handler = new CreateEntityObjectHandler(this.service);
    }

    return this._handler;
  }

  @test('should create entity object')
  async it_should_create_entity(): Promise<void> {
    const command = CreateEntityObjectCommandMother.random();
    const entity = EntityObjectMother.fromCommand(command);

    void this.handler.execute(command);
    this.shouldSaved(entity);
  }
}
