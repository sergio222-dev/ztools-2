export class Budget {
  constructor(readonly id: string, readonly name: string) {}

  static CREATE(id: string, name: string) {
    return new Budget(id, name);
  }
}
