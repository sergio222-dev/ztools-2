import { IQuery } from '@nestjs/cqrs';

export class SignInQuery implements IQuery {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
