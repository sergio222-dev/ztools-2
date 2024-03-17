import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const SubCategoryCreateRequestSchema = z.object({
  id: z.string().describe('id'),
  name: z.string().describe('name'),
  categoryId: z.string().describe('categoryId'),
});

export class SubCategoryCreateRequest extends createZodDto(SubCategoryCreateRequestSchema) {}
