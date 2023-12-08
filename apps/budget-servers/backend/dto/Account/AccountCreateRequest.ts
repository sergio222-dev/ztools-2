import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const AccountCreateRequestSchema = z.object({
  id: z.string().describe('id'),
  name: z.string().describe('name'),
  balance: z.string().describe('balance'),
});

export class AccountCreateRequest extends createZodDto(AccountCreateRequestSchema) {}
