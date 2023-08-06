import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEntityRequest } from '../../../dto/CreateEntityRequest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEntityCommand } from '@zdm/entity/application/create/CreateEntity.command';
import { ListEntityResponse } from '../../../dto/ListEntityResponse';
import { ListEntityQuery } from '@zdm/entity/application/list/ListEntity.query';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';

@Controller('v1/entity')
@ApiTags('entity')
@Injectable()
export class EntityController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async createEntity(@Body() body: CreateEntityRequest): Promise<void> {
    const command = new CreateEntityCommand(
      body.id,
      body.name,
      body.description,
      body.parent_id,
    );

    await this.commandBus.execute(command);
  }

  @Get()
  @ApiResponse({
    type: [ListEntityResponse],
  })
  @ApiBearerAuth('JWT')
  async listEntity(): Promise<ListEntityResponse[]> {
    const query = new ListEntityQuery();
    const result = await this.queryBus.execute<ListEntityQuery, Entity[]>(
      query,
    );
    return result.map((entity) => ({
      id: entity.id.value,
      name: entity.name.value,
      description: entity.description.value,
      parent_id: entity.parent_id.value,
    }));
  }
}
