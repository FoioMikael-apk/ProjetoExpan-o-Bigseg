import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Ocorrencia } from "../entities/Ocorrencia";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

const repo = AppDataSource.getRepository(Ocorrencia);

export class OcorrenciaController {
  async create(req: Request, res: Response) {
    const {
      descricao,
      local,
      status,
      idade,
      sexo,
      produto,
      preco,
      setor,
      observacao,
    } = req.body;

    const imagem = req.file?.filename || "";

    const ocorrencia = repo.create({
      descricao,
      local,
      status,
      idade,
      sexo,
      produto,
      preco,
      setor,
      observacao,
      imagem,
      ativo: true,
    });

    await repo.save(ocorrencia);
    return res.status(201).json(ocorrencia);
  }

  async listAll(req: Request, res: Response) {
    const ocorrencias = await repo.find({
      where: { ativo: true },
      order: { created_at: "DESC" },
    });
    return res.json(ocorrencias);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        descricao,
        local,
        idade,
        sexo,
        produto,
        preco,
        setor,
        observacao,
        status,
      } = req.body;

      const ocorrencia = await repo.findOneBy({ id: Number(id) });

      if (!ocorrencia) {
        return res.status(404).json({ error: "Ocorrência não encontrada" });
      }

      ocorrencia.descricao = descricao;
      ocorrencia.local = local;
      ocorrencia.idade = Number(idade);
      ocorrencia.sexo = sexo;
      ocorrencia.produto = produto;
      ocorrencia.preco = preco;
      ocorrencia.setor = setor;
      ocorrencia.observacao = observacao;
      ocorrencia.status = status;

      if (req.file?.filename) {
        if (ocorrencia.imagem) {
          const caminhoAnterior = path.resolve(__dirname, "..", "..", "uploads", ocorrencia.imagem);
          if (fs.existsSync(caminhoAnterior)) {
            fs.unlinkSync(caminhoAnterior);
          }
        }
        ocorrencia.imagem = req.file.filename;
      }

      await repo.save(ocorrencia);

      return res.status(200).json({ message: "Ocorrência atualizada com sucesso." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar ocorrência" });
    }
  }

  async deleteOcorrencia(req: Request, res: Response) {
    const { id } = req.params;
    const ocorrencia = await repo.findOneBy({ id: Number(id) });

    if (!ocorrencia) {
      return res.status(404).json({ error: "Ocorrência não encontrada" });
    }

    ocorrencia.ativo = false;
    await repo.save(ocorrencia);

    return res.status(200).json({ message: "Ocorrência desativada com sucesso." });
  }

  async exportarPDF(req: Request, res: Response) {
    try {
      const ocorrencias = await repo.find({ where: { ativo: true } });
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=ocorrencias.pdf");

      doc.pipe(res);
      doc.fontSize(18).text("Relatório de Ocorrências", { align: "center" }).moveDown();

      ocorrencias.forEach((oc) => {
        doc.fontSize(12)
          .text(`ID: ${oc.id}`)
          .text(`Descrição: ${oc.descricao}`)
          .text(`Local: ${oc.local}`)
          .text(`Status: ${oc.status}`)
          .text(`Produto: ${oc.produto}`)
          .text(`Setor: ${oc.setor}`)
          .text(`Preço: R$ ${oc.preco}`)
          .text(`Data: ${new Date(oc.created_at).toLocaleString()}`)
          .moveDown();
      });

      doc.end();
    } catch (err) {
      res.status(500).json({ error: "Erro ao gerar PDF" });
    }
  }

  async exportarExcel(req: Request, res: Response) {
    try {
      const ocorrencias = await repo.find({ where: { ativo: true } });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Ocorrências");

      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Descrição", key: "descricao", width: 30 },
        { header: "Local", key: "local", width: 20 },
        { header: "Status", key: "status", width: 15 },
        { header: "Idade", key: "idade", width: 10 },
        { header: "Sexo", key: "sexo", width: 10 },
        { header: "Produto", key: "produto", width: 20 },
        { header: "Preço", key: "preco", width: 10 },
        { header: "Setor", key: "setor", width: 20 },
        { header: "Observação", key: "observacao", width: 30 },
        { header: "Imagem", key: "imagem", width: 30 },
        { header: "Data", key: "created_at", width: 25 },
      ];

      ocorrencias.forEach((oc) => {
        worksheet.addRow({
          id: oc.id,
          descricao: oc.descricao,
          local: oc.local,
          status: oc.status,
          idade: oc.idade,
          sexo: oc.sexo,
          produto: oc.produto,
          preco: oc.preco,
          setor: oc.setor,
          observacao: oc.observacao,
          imagem: oc.imagem,
          created_at: new Date(oc.created_at).toLocaleString(),
        });
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=ocorrencias.xlsx");

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      res.status(500).json({ error: "Erro ao gerar Excel" });
    }
  }

  async exportarPDFPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const oc = await repo.findOneBy({ id: Number(id), ativo: true });

      if (!oc) return res.status(404).json({ error: "Ocorrência não encontrada" });

      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=ocorrencia_${id}.pdf`);

      doc.pipe(res);
      doc.fontSize(18).text("Detalhes da Ocorrência", { align: "center" }).moveDown();

      doc.fontSize(12)
        .text(`ID: ${oc.id}`)
        .text(`Descrição: ${oc.descricao}`)
        .text(`Local: ${oc.local}`)
        .text(`Status: ${oc.status}`)
        .text(`Produto: ${oc.produto}`)
        .text(`Setor: ${oc.setor}`)
        .text(`Preço: R$ ${oc.preco}`)
        .text(`Data: ${new Date(oc.created_at).toLocaleString()}`);

      doc.end();
    } catch (err) {
      res.status(500).json({ error: "Erro ao gerar PDF da ocorrência" });
    }
  }

  async exportarExcelPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const oc = await repo.findOneBy({ id: Number(id), ativo: true });

      if (!oc) return res.status(404).json({ error: "Ocorrência não encontrada" });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Ocorrência");

      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Descrição", key: "descricao", width: 30 },
        { header: "Local", key: "local", width: 20 },
        { header: "Status", key: "status", width: 15 },
        { header: "Produto", key: "produto", width: 20 },
        { header: "Setor", key: "setor", width: 20 },
        { header: "Preço", key: "preco", width: 10 },
        { header: "Data", key: "created_at", width: 25 },
      ];

      worksheet.addRow({
        id: oc.id,
        descricao: oc.descricao,
        local: oc.local,
        status: oc.status,
        produto: oc.produto,
        setor: oc.setor,
        preco: oc.preco,
        created_at: new Date(oc.created_at).toLocaleString(),
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename=ocorrencia_${id}.xlsx`);
      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      res.status(500).json({ error: "Erro ao gerar Excel da ocorrência" });
    }
  }
}