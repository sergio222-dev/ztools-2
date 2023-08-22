import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@zdm/user/domain/User.repository';
import { IdObject } from '@shared/domain/valueObject/IdObject';

@Injectable()
export class FindUser {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(id: IdObject) {
    const result = await this.repository.find(id);

    if (!result) {
      // TODO domain exception
      throw new Error('User not found');
    }

    return result;
  }
}
