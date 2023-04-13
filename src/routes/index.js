import { Router } from "express";
import userRoutes from "./userRouters.js";
import bookRoutes from "./bookRoutes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/books", bookRoutes);

export default routes;