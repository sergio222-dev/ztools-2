import { SimpleRepository } from '@shared/domain/aggregate/SimpleRepository';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import {
  DataSource,
  EntitySchema,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

type BaseSchema = {
  id: string;
};

export abstract class PgBaseRepositoryRepository<
  E extends AggregateRoot,
  EntitySchemaType extends BaseSchema,
> implements SimpleRepository<E>
{
  protected readonly repository: Repository<EntitySchemaType>;
  protected readonly mapToAggregate: (schema: EntitySchemaType) => E;
  protected readonly mapToSchema: (v: E) => EntitySchemaType;

  protected constructor(
    dataSource: DataSource,
    schema: EntitySchema<EntitySchemaType>,
    mapToAggregate: (v: EntitySchemaType) => E,
    mapToEntity: (v: E) => EntitySchemaType,
  ) {
    this.repository = dataSource.getRepository(schema);
    this.mapToAggregate = mapToAggregate;
    this.mapToSchema = mapToEntity;
  }

  async find(id: IdObject): Promise<E | undefined> {
    const result = await this.repository.findOne({
      where: {
        id: id.value,
      } as FindOptionsWhere<EntitySchemaType>,
    });

    return result ? this.mapToAggregate(result) : undefined;
  }

  async findAll(): Promise<E[]> {
    const result = await this.repository.find();
    return result.map((element) => this.mapToAggregate(element));
  }

  async save(value: E): Promise<void | E> {
    const schema = this.mapToSchema(value);
    await this.repository.save(schema);
  }
}
