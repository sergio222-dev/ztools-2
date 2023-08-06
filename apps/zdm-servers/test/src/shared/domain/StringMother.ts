import { MotherCreator } from './MotherCreator';

export class StringMother {
  public static random(): string {
    return MotherCreator.random().datatype.string();
  }
}
