import { inject, injectable } from 'tsyringe';
import * as BudgetRepository from '@core/budget/budget/domain/BudgetRepository';
import { UseCase } from '@core/shared/application/UseCase';
import { Budget } from '@core/budget/budget/domain/Budget';

@injectable()
export class BudgetGetAll implements UseCase<unknown, Budget[]> {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository.BudgetRepository,
  ) {}

  async execute(): Promise<Budget[]> {
    return await this.budgetRepository.getAll();
  }
}
