export class Budget {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly assigned: string,
    readonly activity: string,
    readonly available: string,
  ) {}
}
