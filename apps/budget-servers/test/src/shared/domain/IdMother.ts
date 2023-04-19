import { MotherCreator } from './MotherCreator';

export class IdMother {
  public static random(): string {
    return MotherCreator.random().random.numeric();
  }
}
