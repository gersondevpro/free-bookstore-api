import { Router } from "express";
import userRoutes from "./userRouters.js";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;