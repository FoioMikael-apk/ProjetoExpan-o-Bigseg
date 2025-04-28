import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../ormconfig";
import { router } from "./routes/index";

const app = express();

// Permitir chamadas de qualquer origem
app.use(cors());

// Permitir receber dados JSON
app.use(express.json());

// 🔗 Usa todas as rotas da aplicação
app.use(router);

// Conectar ao banco de dados e iniciar o servidor
AppDataSource.initialize()
  .then(() => {
    app.listen(3333, "0.0.0.0", () => {
      console.log("🚀 Backend rodando na porta 3333 e aceitando conexões da rede!");
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o banco:", error);
  });
