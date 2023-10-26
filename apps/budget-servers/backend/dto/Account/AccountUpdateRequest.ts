import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const AccountUpdateRequestSchema = z.object({
  id: z.string().describe('Account id'),
  name: z.string().describe('Account name'),
  userId: z.string().describe('Account user id'),
});

export class AccountUpdateRequest extends createZodDto(AccountUpdateRequestSchema) {}
