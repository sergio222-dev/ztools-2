import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@zdm/user/domain/User.repository';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { User } from '@zdm/user/domain/User.aggregate';

@Injectable()
export class FindByUserName {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(userName: string): Promise<User | undefined> {
    return this.repository.findByUserName(new StringValueObject(userName));
  }
}
