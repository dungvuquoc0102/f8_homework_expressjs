import { Router } from "express";
import validBodyMiddleware from "../middlewares/validBodyMiddleware.js";
import CategorySchema, {
  PartialCategorySchema,
} from "../validations/categorySchema.js";
import categoryController from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.get("", categoryController.getAllCategories);
categoryRoutes.get("/:id", categoryController.getCategoryById);
categoryRoutes.post(
  "",
  validBodyMiddleware(CategorySchema),
  categoryController.createCategory,
);
categoryRoutes.patch(
  "/:id",
  validBodyMiddleware(PartialCategorySchema),
  categoryController.updateCategory,
);
categoryRoutes.delete("/:id", categoryController.deleteCategory);

export default categoryRoutes;
