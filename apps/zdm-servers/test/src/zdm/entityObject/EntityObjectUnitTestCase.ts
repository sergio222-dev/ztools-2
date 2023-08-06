import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';
import { EntityObjectRepository } from '../../../../src/zdm/entityObject/domain/EntityObject.repository';
import { EntityObject } from '../../../../src/zdm/entityObject/domain/EntityObject.aggregate';
import { IgnoreRecordType } from '../../shared/domain/utils';
import { MockProxy } from 'jest-mock-extended';

export abstract class EntityObjectUnitTestCase extends UnitTestCase {
  private _repository: EntityObjectRepository &
    MockProxy<EntityObjectRepository>;

  get repository(): EntityObjectRepository & MockProxy<EntityObjectRepository> {
    if (!this._repository) {
      this._repository = this.mock<EntityObjectRepository>();
    }

    return this._repository;
  }

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
}
