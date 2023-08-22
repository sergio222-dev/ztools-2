import { Body, Controller, Get, Injectable, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEntityObjectRequest } from '../../../dto/CreateEntityObjectRequest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEntityObjectCommand } from '@zdm/entityObject/application/create/CreateEntityObject.command';
import { ListEntityObjectQuery } from '@zdm/entityObject/application/list/ListEntityObject.query';
import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { AuthenticatedRequest } from '../../../utils/AuthenticatedRequest';
import { ListEntityObjectResponse } from '../../../dto/ListEntityObjectResponse';

@Controller('v1/entityObject')
@ApiTags('entity')
@Injectable()
export class EntityObjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth('JWT')
  async createEntity(@Body() body: CreateEntityObjectRequest, @Req() request) {
    const user = request.user;
    const userId = user.sub;

    const command = new CreateEntityObjectCommand(
      body.id,
      body.name,
      body.entity_id,
      userId,
      body.description,
      body.image_link,
    );

    await this.commandBus.execute(command);
  }

  @Get()
  @ApiBearerAuth('JWT')
  async listEntityObject(
    @Req() request: AuthenticatedRequest,
  ): Promise<ListEntityObjectResponse[]> {
    const user = request.user;
    const userId = user.sub;
    const query = new ListEntityObjectQuery(userId);
    const result = await this.queryBus.execute<
      ListEntityObjectQuery,
      EntityObject[]
    >(query);
    return result.map((x) => ({
      id: x.id.value,
      name: x.name.value,
      entity_id: x.entity_id.value,
      image_link: x.image_link.value,
      description: x.description.value,
    }));
  }
}
