import { Budget } from '@core/budget/budget/domain/Budget';

export class Category {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly assignedBudget: string,
    readonly activity: string,
    readonly available: string,
    readonly budget: Budget,
  ) {}
}
