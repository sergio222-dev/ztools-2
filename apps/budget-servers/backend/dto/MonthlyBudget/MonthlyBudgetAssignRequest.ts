import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const MonthlyBudgetAssignRequestSchema = z.object({
    amount: z.string(),
    subCategoryId: z.string(),
    month: z.string(),
    year: z.string(),
});

export class MonthlyBudgetAssignRequest extends createZodDto(MonthlyBudgetAssignRequestSchema) {}
