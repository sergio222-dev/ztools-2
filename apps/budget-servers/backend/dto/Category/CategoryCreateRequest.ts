import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const CategoryCreateRequestSchema = z.object({
    id: z.string().describe('id'),
    name: z.string().describe('name'),
});

export class CategoryCreateRequest extends createZodDto(CategoryCreateRequestSchema) {}
