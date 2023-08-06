import { Inject, Injectable } from '@nestjs/common';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { User } from '@zdm/user/domain/User.aggregate';
import { UserRepository } from '@zdm/user/domain/User.repository';

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, name: string, email: string, password: string) {
    const entity = User.CREATE(
      new IdObject(id),
      new StringValueObject(name),
      new StringValueObject(email),
      new StringValueObject(password),
    );
    return await this.userRepository.save(entity);
  }
}
