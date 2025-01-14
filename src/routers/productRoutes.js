import { Router } from "express";
import productController from "../controllers/productController.js";
import ProductSchema, {
  PartialProductSchema,
} from "../validations/productSchema.js";
import validateReqBody from "../middlewares/validateReqBody.js";
import verifyUser from "../middlewares/verifyUser.js";
import checkPermission from "../middlewares/checkPermission.js";

const productRoutes = Router();

//route without middleware
productRoutes.get("", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);

//route with middleware
productRoutes.post(
  "",
  verifyUser,
  checkPermission,
  validateReqBody(ProductSchema),
  productController.createProduct,
);
productRoutes.patch(
  "/:id",
  verifyUser,
  checkPermission,
  validateReqBody(PartialProductSchema),
  productController.updateProduct,
);
productRoutes.delete(
  "/:id",
  verifyUser,
  checkPermission,
  productController.deleteProduct,
);

export default productRoutes;
