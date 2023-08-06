import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SignInQuery } from '@zdm/user/application/signIn/SignIn.query';
import { SignIn } from '@zdm/user/application/signIn/SignIn';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { SignInResult } from '@zdm/user/application/signIn/SignIn.result';

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery, SignInResult> {
  constructor(private readonly service: SignIn) {}
  async execute(query: SignInQuery): Promise<SignInResult> {
    return await this.service.execute(
      new StringValueObject(query.username),
      new StringValueObject(query.password),
    );
  }
}
