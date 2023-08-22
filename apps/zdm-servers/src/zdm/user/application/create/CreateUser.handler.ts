import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@zdm/user/application/create/CreateUser.command';
import { CreateUser } from '@zdm/user/application/create/CreateUser';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly service: CreateUser) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.service.execute(
      command.id,
      command.name,
      command.email,
      command.password,
    );
  }
}
