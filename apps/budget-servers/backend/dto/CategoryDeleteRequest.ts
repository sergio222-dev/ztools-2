import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const CategoryDeleteRequestSchema = z.object({
  id: z.string().describe('id'),
  subCategoryId: z.string().describe('sub category id'),
});

export class CategoryDeleteRequest extends createZodDto(CategoryDeleteRequestSchema) {}
