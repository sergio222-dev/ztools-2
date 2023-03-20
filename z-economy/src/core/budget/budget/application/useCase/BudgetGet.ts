import { UseCase } from '@core/shared/application/UseCase';
import { Budget } from '@core/budget/budget/domain/Budget';
import { inject, injectable } from 'tsyringe';
import * as BudgetRepository from '@core/budget/budget/domain/BudgetRepository';

@injectable()
export class BudgetGet implements UseCase<string, Budget> {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository.BudgetRepository,
  ) {}

  async execute(id: string): Promise<Budget> {
    return await this.budgetRepository.get(id);
  }
}
