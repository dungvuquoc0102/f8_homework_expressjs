import { Router } from "express";
import validateReqBody from "../middlewares/validateReqBody.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import authController from "../controllers/authController.js";

const authRoutes = Router();

//route with middleware
authRoutes.post(
  "/register",
  validateReqBody(registerSchema),
  authController.register,
);
authRoutes.post("/login", validateReqBody(loginSchema), authController.login);

export default authRoutes;
