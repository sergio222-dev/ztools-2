import { MotherCreator } from './MotherCreator';

export class QuantityMother {
  public static random(
    quantity = Number.parseInt(MotherCreator.random().random.numeric()),
  ): number {
    return Number.parseInt(MotherCreator.random().random.numeric(quantity));
  }
}
