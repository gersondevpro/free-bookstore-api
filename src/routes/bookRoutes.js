import { Router } from "express";

const bookRoutes = Router();

bookRoutes.post("/", authMiddleware.authValidation , validateSchema(bookSchema), bookControllers.create);

export default bookRoutes;