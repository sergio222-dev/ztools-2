import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '@zdm/user/domain/User.repository';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { JwtService } from '@nestjs/jwt';
import { SignInResult } from '@zdm/user/application/signIn/SignIn.result';

@Injectable()
export class SignIn {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(userName: StringValueObject, password: StringValueObject) {
    const result = await this.repository.findByUserName(userName);

    if (!result) {
      // TODO domain exception
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!result.password.isEqualTo(password)) {
      // TODO domain exception
      throw new ForbiddenException({
        message: 'Invalid password',
      });
    }

    const payload = { sub: result.id.value, username: result.name.value };
    const access_token = await this.jwtService.signAsync(payload);

    return new SignInResult(access_token);
  }
}
