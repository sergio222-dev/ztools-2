import { faker } from '@faker-js/faker';

export class MotherCreator {
  private static faker = faker;

  public static random(): typeof faker {
    return MotherCreator.faker;
  }
}
