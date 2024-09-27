import { DataSource } from "typeorm";
import { join } from "path";
import { config } from "dotenv";

config({ path: "./env/.env" });

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql",
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  migrations: [join(__dirname, "/../migration/**{.ts,.js}")],
  entities: [join(__dirname, "/../**/**.entity{.ts,.js}")],
  synchronize: false,
});
