import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';
import { EntityObjectRepository } from '../../../../src/zdm/entityObject/domain/EntityObject.repository';
import { EntityObject } from '../../../../src/zdm/entityObject/domain/EntityObject.aggregate';
import { IgnoreRecordType } from '../../shared/domain/utils';
import { MockProxy } from 'jest-mock-extended';

export abstract class EntityObjectUnitTestCase extends UnitTestCase<
  EntityObject,
  EntityObjectRepository
> {
  shouldSaved(entity: EntityObject) {
    expect(this.repository.save).toBeCalledTimes(1);
    expect(this.repository.save).toBeCalledWith(
      expect.objectContaining<IgnoreRecordType<EntityObject>>({
        id: entity.id,
        user_id: entity.user_id,
        name: entity.name,
        description: entity.description,
        image_link: entity.image_link,
        entity_id: entity.entity_id,
      }),
    );
    expect(this.repository.save).not.toHaveBeenCalledWith({});
  }

  shouldReturnEntityObject(entity: EntityObject, result: EntityObject) {
    expect(this.repository.find).toBeCalledTimes(1);
    expect(this.repository.find).toBeCalledWith(entity.id);
    expect(result).toBe(entity);
  }

  assertEntityObjectList(list: EntityObject[], result: EntityObject[]) {
    expect(result.length).toBe(list.length);
    for (const [index, entity] of list.entries()) {
      expect(result[index]).toBe(
        expect.objectContaining<IgnoreRecordType<EntityObject>>({
          id: entity.id,
          user_id: entity.user_id,
          name: entity.name,
          description: entity.description,
          image_link: entity.image_link,
          entity_id: entity.entity_id,
        }),
      );
    }
  }
}
