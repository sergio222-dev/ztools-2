import { SimpleRepository } from '@shared/domain/aggregate/SimpleRepository';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import {
  DataSource,
  EntitySchema,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

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
  protected readonly datasource: DataSource;

  protected constructor(
    dataSource: DataSource,
    schema: EntitySchema<EntitySchemaType>,
    mapToAggregate: (v: EntitySchemaType) => E,
    mapToEntity: (v: E) => EntitySchemaType,
  ) {
    this.datasource = dataSource;
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

  async findAll(userId?: IdObject): Promise<E[]> {
    const result = await this.repository.find({
      where: {
        user_id: userId?.value ?? undefined,
      } as FindOptionsWhere<EntitySchemaType & { user_id: string }>,
    });
    return result.map((element) => this.mapToAggregate(element));
  }

  async save(value: E): Promise<void | E> {
    const schema = this.mapToSchema(value);
    await this.repository.save(schema);
  }
}
