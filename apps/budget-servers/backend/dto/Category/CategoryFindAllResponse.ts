import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const CategoryFindAllSubCategoryResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    assigned: z.string(),
    activity: z.string(),
    available: z.string(),
});

const CategoryFindAllResponseSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        subCategories: z.array(CategoryFindAllSubCategoryResponseSchema),
    }),
);

export class CategoryFindAllSubCategoryResponse extends createZodDto(
    CategoryFindAllSubCategoryResponseSchema,
) {}

export class CategoryFindAllResponse extends createZodDto(CategoryFindAllResponseSchema) {}
