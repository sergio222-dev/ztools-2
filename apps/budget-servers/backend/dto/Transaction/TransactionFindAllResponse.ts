import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const TransactionFindAllResponseSchema = z.object({
  id: z.string().describe('Transaction id'),
  inflow: z.string().describe('Inflow'),
  outflow: z.string().describe('Outflow'),
  payee: z.string().describe('Payee'),
  memo: z.string().describe('Memo'),
  subCategoryId: z.string().describe('SubCategoryId'),
  date: z.string().describe('Date'),
  cleared: z.boolean().describe('Cleared'),
  accountId: z.string().describe('AccountId'),
});

export class TransactionFindAllResponse extends createZodDto(TransactionFindAllResponseSchema) {}
