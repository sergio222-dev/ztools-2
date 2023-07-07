export class SubCategory {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly categoryId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static CREATE(id: string, name: string, categoryId: string, createdAt: Date, updatedAt: Date) {
    console.log(`sub category with id ${id} CREATED`);
    return new SubCategory(id, name, categoryId, createdAt, updatedAt);
  }

  public static RETRIEVE(id: string, name: string, categoryId: string, createdAt: Date, updatedAt: Date) {
    console.log(`sub category with id ${id} RETRIEVED`);
    return new SubCategory(id, name, categoryId, createdAt, updatedAt);
  }
}
