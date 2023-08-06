import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEntityObjectCommand } from '@zdm/entityObject/application/create/CreateEntityObject.command';
import { CreateEntityObject } from '@zdm/entityObject/application/create/CreateEntityObject';

@CommandHandler(CreateEntityObjectCommand)
export class CreateEntityObjectHandler
  implements ICommandHandler<CreateEntityObjectCommand, void>
{
  constructor(private readonly createEntityObjectService: CreateEntityObject) {}

  async execute(command: CreateEntityObjectCommand): Promise<void> {
    await this.createEntityObjectService.execute(
      command.id,
      command.name,
      command.entity_id,
      command.user_id,
      command.description,
      command.image_link,
    );
  }
}
