import { EntityUnitTestCase } from '../../EntityUnitTestCase';
import { CreateEntityHandler } from '../../../../../../src/zdm/entity/application/create/CreateEntity.handler';
import { suite, test } from '@testdeck/jest';
import { CreateEntityCommandMother } from './CreateEntityCommandMother';
import { EntityMother } from '../../domain/EntityMother';
import { CreateEntity } from '../../../../../../src/zdm/entity/application/create/CreateEntity';

@suite('Entity create')
export class CreateEntityTest extends EntityUnitTestCase {
  private _handler: CreateEntityHandler;
  private _service: CreateEntity;

  get service(): CreateEntity {
    if (!this._service) {
      this._service = new CreateEntity(this.repository);
    }

    return this._service;
  }

  get handler(): CreateEntityHandler {
    if (!this._handler) {
      this._handler = new CreateEntityHandler(this.service);
    }

    return this._handler;
  }

  @test('should create entity')
  it_should_create_entity() {
    const command = CreateEntityCommandMother.random();
    const entity = EntityMother.fromCommand(command);

    void this.handler.execute(command);
    this.shouldSaved(entity);
  }
}
