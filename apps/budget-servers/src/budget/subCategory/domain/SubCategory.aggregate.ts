import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class SubCategory extends AggregateRootOwnership {
  private constructor(
    id: string,
    public readonly name: string,
    userId: string,
    public readonly categoryId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, userId, createdAt, updatedAt);
  }

  public static CREATE(
    id: string,
    name: string,
    userId: string,
    categoryId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    console.log(`sub category with id ${id} CREATED`);
    return new SubCategory(id, name, userId, categoryId, createdAt, updatedAt);
  }

  public static RETRIEVE(
    id: string,
    name: string,
    userId: string,
    categoryId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    console.log(`sub category with id ${id} RETRIEVED`);
    return new SubCategory(id, name, userId, categoryId, createdAt, updatedAt);
  }
}
