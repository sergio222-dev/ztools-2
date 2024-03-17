import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const SubCategoryUpdateRequestSchema = z.object({
  id: z.string().describe('id'),
  name: z.string().describe('name'),
  categoryId: z.string().describe('categoryId'),
});

export class SubCategoryUpdateRequest extends createZodDto(SubCategoryUpdateRequestSchema) {}
