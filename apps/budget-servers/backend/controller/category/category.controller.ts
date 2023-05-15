import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CategoryFindAllQuery } from '@budget/categories/application/useCase/find/CategoryFindAll.query';
import { Category } from '@budget/categories/domain/Category.aggregate';
import { CategoryCreateCommand } from '@budget/categories/application/useCase/create/CategoryCreate.command';
import { CategoryUpdateCommand } from '@budget/categories/application/useCase/update/CategoryUpdate.command';
import { CategoryFindOneQuery } from '@budget/categories/application/useCase/findOne/CategoryFindOne.query';
import { CategoryDeleteCommand } from '@budget/categories/application/useCase/delete/CategoryDelete.command';

@Controller('category')
@ApiTags('categories')
@Injectable()
export class CategoryController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
  })
  async findAll() {
    return await this.queryBus.execute<CategoryFindAllQuery, Category[]>(new CategoryFindAllQuery());
  }

  @Post()
  @ApiResponse({
    status: 201,
  })
  async create(@Body() bodyCommand: CategoryCreateCommand) {
    const command = new CategoryCreateCommand(
      bodyCommand.id,
      bodyCommand.name,
      bodyCommand.assignedBudget,
      bodyCommand.currentBudget,
    );
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiResponse({
    status: 201,
  })
  async update(@Body() bodyCommand: CategoryUpdateCommand) {
    const query = new CategoryFindOneQuery(bodyCommand.id);

    const category = await this.queryBus.execute<CategoryFindOneQuery, Category>(query);

    if (category.id === '')
      throw new HttpException(`the category with id ${bodyCommand.id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new CategoryUpdateCommand(
      category.id,
      bodyCommand.name,
      bodyCommand.assignedBudget,
      bodyCommand.currentBudget,
    );
    await this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const query = new CategoryFindOneQuery(id);

    const category = await this.queryBus.execute<CategoryFindOneQuery, Category>(query);

    if (category.id === '')
      throw new HttpException(`the category with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new CategoryDeleteCommand(id);

    await this.commandBus.execute(command);
  }
}
