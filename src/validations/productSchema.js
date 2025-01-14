import { z } from "zod";

const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  categoryId: z.string().optional(),
  isHidden: z.boolean().default(false),
  deleteAt: z.string().datetime().nullable().default(null),
});

export const PartialProductSchema = ProductSchema.partial();

export default ProductSchema;
