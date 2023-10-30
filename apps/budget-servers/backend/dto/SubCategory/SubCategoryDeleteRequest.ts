import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const SubCategoryDeleteRequestSchema = z.object({
    id: z.string().describe('id'),
    subCategoryId: z.string().describe('subCategoryId'),
});

export class SubCategoryDeleteRequest extends createZodDto(SubCategoryDeleteRequestSchema) {}
