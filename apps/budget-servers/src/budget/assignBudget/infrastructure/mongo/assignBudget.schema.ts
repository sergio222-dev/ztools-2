import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';

export interface AssignBudgetSchemaType extends OwnershipSchema {
  subCategoryId: string;
  month: string;
  year: string;
}
