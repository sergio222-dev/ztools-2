import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const ListEntityResponseSchema = z.object({
  id: z.string().describe("entity's id"),
  name: z.string().describe("entity's name"),
  description: z.string().optional().describe("entity's description"),
  parent_id: z.string().optional().describe("entity's parent id"),
});

export class ListEntityResponse extends createZodDto(
  ListEntityResponseSchema,
) {}
