import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';
import { EntityRepository } from '../../../../src/zdm/entity/domain/Entity.repository';
import { Entity } from '../../../../src/zdm/entity/domain/Entity.aggregate';
import { IgnoreRecordType } from '../../shared/domain/utils';

export abstract class EntityUnitTestCase extends UnitTestCase<
  Entity,
  EntityRepository
> {
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

  shouldFindEntities() {
    expect(this.repository.findAll).toBeCalledTimes(1);
    expect(this.repository.findAll).toBeCalledWith();
  }

  assertEntityList(list: Entity[], result: Entity[]) {
    expect(result.length).toBe(list.length);
    for (const [index, entity] of list.entries()) {
      expect(result[index]).toEqual(
        expect.objectContaining<IgnoreRecordType<Entity>>({
          id: entity.id,
          user_id: entity.user_id,
          name: entity.name,
          description: entity.description,
          parent_id: entity.parent_id,
        }),
      );
    }
  }
}
