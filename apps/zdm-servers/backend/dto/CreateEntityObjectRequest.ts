import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const CreateEntityObjectDtoSchema = z.object({
  id: z.string().describe("entity object's id"),
  name: z.string().describe("entity object's name"),
  description: z.string().describe("entity object's description"),
  entity_id: z.string().describe("entity object's entity id"),
  image_link: z.string().describe("entity object's image link"),
});

export class CreateEntityObjectRequest extends createZodDto(
  CreateEntityObjectDtoSchema,
) {}
