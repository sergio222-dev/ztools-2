import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEntityCommand } from '@zdm/entity/application/delete/DeleteEntity.command';
import { DeleteEntity } from '@zdm/entity/application/delete/DeleteEntity';

@CommandHandler(DeleteEntityCommand)
export class DeleteEntityHandler
  implements ICommandHandler<DeleteEntityCommand, void>
{
  constructor(private readonly deleteEntityService: DeleteEntity) {}
  async execute(command: DeleteEntityCommand) {
    await this.deleteEntityService.execute(command.id, command.userid);
  }
}
