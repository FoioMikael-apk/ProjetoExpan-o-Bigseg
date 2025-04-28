import { Router } from "express";
import ocorrenciasRoutes from "./ocorrencias";

const router = Router();

router.use("/ocorrencias", ocorrenciasRoutes);

export { router };
