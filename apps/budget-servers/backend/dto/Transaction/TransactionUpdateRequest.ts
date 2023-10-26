import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const TransactionUpdateRequestSchema = z.object({
  id: z.string().describe('id'),
  inflow: z.string().optional().describe('inflow amount'),
  outflow: z.string().optional().describe('outflow amount'),
  payee: z.string().optional().describe('payee'),
  memo: z.string().optional().describe('memo'),
  subCategoryId: z.string().optional().describe('subCategoryId'),
  date: z.string().optional().describe('date'),
  cleared: z.boolean().optional().describe('cleared'),
  accountId: z.string().optional().describe('accountId'),
});

export class TransactionUpdateRequest extends createZodDto(TransactionUpdateRequestSchema) {}
