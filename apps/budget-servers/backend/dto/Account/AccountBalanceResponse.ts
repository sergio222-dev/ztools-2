import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const AccountBalanceResponseSchema = z.object({
  id: z.string().describe('Account id'),
  name: z.string().describe('Account name'),
  balance: z.string().describe('Account balance'),
});

export class AccountBalanceResponse extends createZodDto(AccountBalanceResponseSchema) {}