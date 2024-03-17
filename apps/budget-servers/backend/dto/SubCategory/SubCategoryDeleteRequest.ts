import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const SubCategoryDeleteRequestSchema = z.object({
  oldSubCategory: z.string().describe('oldSubCategoryId'),
  newSubCategory: z.string().describe('newSubCategoryId'),
});

export class SubCategoryDeleteRequest extends createZodDto(SubCategoryDeleteRequestSchema) {}
