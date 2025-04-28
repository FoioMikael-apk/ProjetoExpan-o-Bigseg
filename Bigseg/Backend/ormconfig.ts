import { DataSource } from "typeorm";
import { Ocorrencia } from "./src/entities/Ocorrencia"
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "308076",
  database: "cftv_ocorrencias",
  synchronize: true,
  logging: false,
  entities: [Ocorrencia],
});
