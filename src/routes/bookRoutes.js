import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const bookRoutes = Router();

bookRoutes.post("/", authMiddleware.authValidation , validateSchema(bookSchema), bookControllers.create);

export default bookRoutes;