import { IQuery } from '@nestjs/cqrs';

export class FindByUserNameQuery implements IQuery {
  constructor(public readonly username: string) {}
}
