import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const ListEntityObjectResponseSchema = z.object({
  id: z.string().describe('entity object id'),
  name: z.string().describe('entity object name'),
  description: z.string().optional().describe('entity object description'),
  entity_id: z.string().describe('entity object entity id'),
  image_link: z.string().optional().describe('entity object image link'),
});

export class ListEntityObjectResponse extends createZodDto(
  ListEntityObjectResponseSchema,
) {}
