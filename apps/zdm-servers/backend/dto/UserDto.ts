import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const UserDtoSchema = z.object({
  sub: z.string().describe('user id'),
  name: z.string().describe('user name'),
});

export class UserDto extends createZodDto(UserDtoSchema) {}
