import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEntityObjectRequest } from '../../../dto/CreateEntityObjectRequest';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEntityObjectCommand } from '@zdm/entityObject/application/create/CreateEntityObject.command';

@Controller('v1/entityObject')
@ApiTags('entity')
@Injectable()
export class EntityObjectController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  async createEntity(@Body() body: CreateEntityObjectRequest) {
    const command = new CreateEntityObjectCommand(
      body.id,
      body.name,
      body.entity_id,
      body.description,
      body.image_link,
    );

    await this.commandBus.execute(command);
  }
}
