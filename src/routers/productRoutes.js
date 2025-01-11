import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import ProductSchema, {
  PartialProductSchema,
} from "../validations/productSchema.js";
import validBodyMiddleware from "../middlewares/validBodyMiddleware.js";

const productRoutes = Router();

productRoutes.get("", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("", validBodyMiddleware(ProductSchema), createProduct);
productRoutes.patch(
  "/:id",
  validBodyMiddleware(PartialProductSchema),
  updateProduct,
);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
