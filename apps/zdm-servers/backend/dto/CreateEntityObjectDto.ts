export class CreateEntityObjectDto {
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get entity_id(): string {
    return this._entity_id;
  }

  get image_link(): string | undefined {
    return this._image_link;
  }
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _entity_id: string,
    private readonly _description?: string,
    private readonly _image_link?: string,
  ) {}
}
