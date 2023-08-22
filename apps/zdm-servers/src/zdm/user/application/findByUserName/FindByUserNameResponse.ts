export class FindByUserNameResponse {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly password: string,
  ) {}
}
