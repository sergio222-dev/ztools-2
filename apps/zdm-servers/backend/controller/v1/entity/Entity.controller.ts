import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEntityRequest } from '../../../dto/CreateEntityRequest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEntityCommand } from '@zdm/entity/application/create/CreateEntity.command';
import { EntityDto } from '../../../dto/EntityDto';
import { ListEntityQuery } from '@zdm/entity/application/list/ListEntity.query';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { AuthenticatedRequest } from '../../../utils/AuthenticatedRequest';
import { DeleteEntityCommand } from '@zdm/entity/application/delete/DeleteEntity.command';
import { FindEntityQuery } from '@zdm/entity/application/find/FindEntity.query';

@Controller('v1/entity')
@ApiTags('entity')
@Injectable()
export class EntityController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @ApiBearerAuth('JWT')
  async createEntity(
    @Body() body: CreateEntityRequest,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    const user = request.user;
    const userId = user.sub;
    console.log('entity', body);
    const command = new CreateEntityCommand(
      body.id,
      body.name,
      userId,
      body.description,
      body.parent_id,
    );

    await this.commandBus.execute(command);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  async deleteEntity(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    const user = request.user;
    const userId = user.sub;
    const deleteEntityCommand = new DeleteEntityCommand(id, userId);
    await this.commandBus.execute(deleteEntityCommand);
  }

  @Get()
  @ApiResponse({
    type: [EntityDto],
  })
  @ApiBearerAuth('JWT')
  async listEntity(): Promise<EntityDto[]> {
    const query = new ListEntityQuery();
    const result = await this.queryBus.execute<ListEntityQuery, Entity[]>(
      query,
    );
    return result.map((entity) => ({
      id: entity.id.value,
      name: entity.name.value,
      order: entity.order.value,
      description: entity.description.value,
      parent_id: entity.parent_id.value,
    }));
  }

  @Get(':id')
  @ApiResponse({
    type: EntityDto,
  })
  @ApiBearerAuth('JWT')
  async findEntity(@Param('id') id: string): Promise<EntityDto> {
    const query = new FindEntityQuery(id);

    const result = await this.queryBus.execute<FindEntityQuery, Entity>(query);

    return {
      id: result.id.value,
      name: result.name.value,
      order: result.order.value,
      description: result.description.value,
      parent_id: result.parent_id.value,
    };
  }
}
