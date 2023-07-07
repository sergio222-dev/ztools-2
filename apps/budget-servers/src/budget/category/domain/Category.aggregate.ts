export class Category {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static CREATE(id: string, name: string, createdAt: Date, updatedAt: Date) {
    console.log(`category with id ${id} CREATED`);
    return new Category(id, name, createdAt, updatedAt);
  }

  static RETRIEVE(id: string, name: string, createdAt: Date, updatedAt: Date) {
    console.log(`category with id ${id} RETRIEVED`);
    return new Category(id, name, createdAt, updatedAt);
  }
}
