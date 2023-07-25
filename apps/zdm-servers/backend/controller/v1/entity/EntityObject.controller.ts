import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEntityObjectDto } from '../../../dto/CreateEntityObjectDto';
import { CreateEntityObject } from '@zdm/entityObject/application/CreateEntityObject';

@Controller('v1/entityObject')
@ApiTags('entity')
@Injectable()
export class EntityObjectController {
  constructor(
    @Inject(CreateEntityObject)
    private readonly createEntityService: CreateEntityObject,
  ) {}
  @Post()
  async createEntity(@Body() body: CreateEntityObjectDto) {
    await this.createEntityService.execute(
      body.id,
      body.name,
      body.entity_id,
      body.description,
      body.image_link,
    );
  }
}
