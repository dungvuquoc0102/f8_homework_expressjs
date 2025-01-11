import { z } from "zod";

const CategorySchema = z.object({
  title: z.string(),
  description: z.string(),
  products: z.array(z.string().optional()),
  isHidden: z.boolean().default(false),
  deletedAt: z.string().datetime().nullable().default(null),
});

export const PartialCategorySchema = CategorySchema.partial();

export default CategorySchema;
