import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const SignInDtoSchema = z.object({
  username: z.string().describe('username'),
  password: z.string().describe('password'),
});

export class SignInRequest extends createZodDto(SignInDtoSchema) {}
