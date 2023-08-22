export const recordInfo = {
  updatedAt: {
    type: Date,
    name: 'updatedat',
  },
  createdAt: {
    type: Date,
    name: 'createdat',
  },
};

export const ownershipInfo = {
  user_id: {
    type: String,
    name: 'user_id',
  },
  ...recordInfo,
};

export interface BaseEntitySchema {
  createdAt: Date;
  updatedAt: Date;
}

export interface OwnershipEntitySchema extends BaseEntitySchema {
  user_id: string;
  id: string;
}
