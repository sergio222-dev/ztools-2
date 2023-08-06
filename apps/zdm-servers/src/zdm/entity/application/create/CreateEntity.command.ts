import { ICommand } from '@nestjs/cqrs';

export class CreateEntityCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user_id: string,
    public readonly description?: string,
    public readonly parent_id?: string,
  ) {}
}
