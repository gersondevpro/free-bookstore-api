import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { bookSchema } from "../schemas/Book.js";
import bookControllers from "../controllers/bookControllers.js";

const bookRoutes = Router();

bookRoutes.post("/", authMiddleware.authValidation , validateSchema(bookSchema), bookControllers.create);
bookRoutes.get("/", authMiddleware.authValidation, bookControllers.findAll)

export default bookRoutes;