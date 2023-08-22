import { ICommand } from '@nestjs/cqrs';

export class CreateEntityObjectCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly entity_id: string,
    public readonly user_id: string,
    public readonly description?: string,
    public readonly image_link?: string,
  ) {}
}
