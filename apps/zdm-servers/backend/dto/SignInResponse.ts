import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const SignInResponseSchema = z.object({
  accessToken: z.string().describe('access token'),
});

export class SignInResponse extends createZodDto(SignInResponseSchema) {}
