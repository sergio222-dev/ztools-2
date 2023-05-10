import { CategoryRepository } from '@budget/categories/domain/Category.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Category } from '@budget/categories/domain/Category.aggregate';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createOne(category: Category): Promise<void> {
    await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOneById(id: string): Promise<Category> {
    return this.categoryRepository.findOneById(id);
  }

  async update(category: Category): Promise<void> {
    await this.categoryRepository.update(category);
  }
}
