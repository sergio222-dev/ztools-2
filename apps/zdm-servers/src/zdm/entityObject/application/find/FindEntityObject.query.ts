import { IQuery } from '@nestjs/cqrs';

export class FindEntityObjectQuery implements IQuery {
  constructor(public readonly id: string) {}
}
