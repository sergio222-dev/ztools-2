import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEntityDto } from '../../../dto/CreateEntityDto';
import { CreateEntity } from '@zdm/entity/application/CreateEntity';

@Controller('v1/entity')
@ApiTags('entity')
@Injectable()
export class EntityController {
  constructor(
    @Inject(CreateEntity) private readonly createEntityService: CreateEntity,
  ) {}

  @Post()
  async createEntity(@Body() body: CreateEntityDto): Promise<void> {
    await this.createEntityService.execute(
      body.id,
      body.name,
      body.description,
      body.parent_id,
    );
  }
}
