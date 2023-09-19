import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const EntitySchema = z.object({
  id: z.string().describe("entity's id"),
  name: z.string().describe("entity's name"),
  order: z.number().describe("entity's order"),
  description: z.string().optional().describe("entity's description"),
  parent_id: z.string().optional().describe("entity's parent id"),
  nodes: z.lazy(() => EntitySchema.array()).optional(),
});

export class EntityDto extends createZodDto(EntitySchema) {}
