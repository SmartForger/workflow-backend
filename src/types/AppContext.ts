import { DataSource } from "typeorm";

export interface AppContext {
  datasource: DataSource;
}
