import { Router } from "express";
import validateReqBody from "../middlewares/validateReqBody.js";
import CategorySchema, {
  PartialCategorySchema,
} from "../validations/categorySchema.js";
import categoryController from "../controllers/categoryController.js";
import verifyUser from "../middlewares/verifyUser.js";
import checkPermission from "../middlewares/checkPermission.js";

const categoryRoutes = Router();

//route without middleware
categoryRoutes.get("", categoryController.getAllCategories);
categoryRoutes.get("/:id", categoryController.getCategoryById);

//route with middleware
categoryRoutes.post(
  "",
  verifyUser,
  checkPermission,
  validateReqBody(CategorySchema),
  categoryController.createCategory,
);
categoryRoutes.patch(
  "/:id",
  verifyUser,
  checkPermission,
  validateReqBody(PartialCategorySchema),
  categoryController.updateCategory,
);
categoryRoutes.delete(
  "/:id",
  verifyUser,
  checkPermission,
  categoryController.deleteCategory,
);

export default categoryRoutes;
