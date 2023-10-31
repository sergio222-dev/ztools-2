import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';
const TransactionCreateRequestSchema = z.object({
    id: z.string().describe('id'),
    inflow: z.string().describe('inflow amount'),
    outflow: z.string().describe('outflow amount'),
    payee: z.string().describe('payee'),
    memo: z.string().describe('memo'),
    subCategoryId: z.string().describe('subCategoryId'),
    date: z.string().describe('date'),
    cleared: z.boolean().describe('cleared'),
    accountId: z.string().describe('accountId'),
});

export class TransactionCreateRequest extends createZodDto(TransactionCreateRequestSchema) {}
