import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEntityCommand } from '@zdm/entity/application/create/CreateEntity.command';
import { CreateEntity } from '@zdm/entity/application/create/CreateEntity';

@CommandHandler(CreateEntityCommand)
export class CreateEntityHandler
  implements ICommandHandler<CreateEntityCommand, void>
{
  constructor(private readonly createEntityService: CreateEntity) {}
  async execute(command: CreateEntityCommand): Promise<void> {
    await this.createEntityService.execute(
      command.id,
      command.name,
      command.user_id,
      command.description,
      command.parent_id,
    );
  }
}
