import { IQuery } from '@nestjs/cqrs';

export class FindEntityQuery implements IQuery {
  constructor(public readonly id: string) {}
}
