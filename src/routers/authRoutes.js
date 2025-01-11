import { Router } from "express";
import validBodyMiddleware from "../middlewares/validBodyMiddleware.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import authController from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validBodyMiddleware(registerSchema),
  authController.register
);
authRoutes.post(
  "/login",
  validBodyMiddleware(loginSchema),
  authController.login
);

export default authRoutes;
