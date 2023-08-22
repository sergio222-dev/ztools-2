import { ICommand } from '@nestjs/cqrs';

export class DeleteEntityCommand implements ICommand {
  constructor(public readonly id: string, public readonly userid: string) {}
}
