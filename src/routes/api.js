import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  createProducts,
  updateProduct,
  deleteProduct,
  deleteProducts,
} from "../controllers/productController.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.post("/products/batch", createProducts);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.delete("/products", deleteProducts);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
