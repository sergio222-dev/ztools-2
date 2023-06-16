import { Budget } from '@core/budget/budget/domain/Budget';

export class Category {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly assigned: string,
    readonly activity: string,
    readonly available: string,
    readonly budget: Budget,
  ) {}
}