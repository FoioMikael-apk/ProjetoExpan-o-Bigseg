import { Router, Request, Response } from "express";
import { upload } from "../config/upload";
import { OcorrenciaController } from "../controllers/OcorrenciaController";
import { catchAsync } from "../utils/catchAsync";

const router = Router();
const controller = new OcorrenciaController();

router.post(
  "/",
  upload.single("imagem"),
  catchAsync((req: Request, res: Response) => controller.create(req, res))
);

router.get(
  "/",
  catchAsync((req: Request, res: Response) => controller.listAll(req, res))
);

router.put(
  "/:id",
  upload.single("imagem"), // 🔁 igual ao campo usado no FormData
  catchAsync((req: Request, res: Response) => controller.update(req, res))
);

router.delete(
  "/:id",
  catchAsync((req: Request, res: Response) => controller.deleteOcorrencia(req, res))
);

router.get(
  "/export/pdf",
  catchAsync((req: Request, res: Response) => controller.exportarPDF(req, res))
);

router.get(
  "/export/excel",
  catchAsync((req: Request, res: Response) => controller.exportarExcel(req, res))
);

router.get(
  "/export/pdf/:id",
  catchAsync((req: Request, res: Response) => controller.exportarPDFPorId(req, res))
);

router.get(
  "/export/excel/:id",
  catchAsync((req: Request, res: Response) => controller.exportarExcelPorId(req, res))
);

export default router;
