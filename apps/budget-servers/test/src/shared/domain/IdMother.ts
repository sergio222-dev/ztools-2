import { MotherCreator } from './MotherCreator';

export class IdMother {
  public static random(): string {
    return MotherCreator.random().datatype.uuid();
  }

  public static randomCollection(quantity = 1): string[] {
    const collection: string[] = [];
    for (const _ of Array.from({ length: quantity })) {
      collection.push(MotherCreator.random().datatype.uuid());
    }

    return collection;
  }
}
