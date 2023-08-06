import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';
import { EntityRepository } from '../../../../src/zdm/entity/domain/Entity.repository';
import { CreateEntity } from '../../../../src/zdm/entity/application/create/CreateEntity';
import { Entity } from '../../../../src/zdm/entity/domain/Entity.aggregate';
import { IgnoreRecordType } from '../../shared/domain/utils';
import { MockProxy } from 'jest-mock-extended';

export abstract class EntityUnitTestCase extends UnitTestCase {
  private _repository: EntityRepository & MockProxy<EntityRepository>;

  get repository(): EntityRepository & MockProxy<EntityRepository> {
    if (!this._repository) {
      this._repository = this.mock<EntityRepository>();
    }

    return this._repository;
  }

  shouldSaved(entity: Entity) {
    expect(this.repository.save).toBeCalledTimes(1);
    expect(this.repository.save).toBeCalledWith(
      expect.objectContaining<IgnoreRecordType<Entity>>({
        id: entity.id,
        user_id: entity.user_id,
        name: entity.name,
        description: entity.description,
        parent_id: entity.parent_id,
      }),
    );
    expect(this.repository.save).not.toHaveBeenCalledWith({});
  }

  shouldReturnEntity(entity: Entity, result: Entity) {
    expect(this.repository.find).toBeCalledTimes(1);
    expect(this.repository.find).toBeCalledWith(entity.id);
    expect(result).toBe(entity);
  }
}
