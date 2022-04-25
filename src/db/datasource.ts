import { DataSource } from "typeorm";
import "dotenv/config";

import { Workflow } from "../entities/Workflow";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowEvent } from "../entities/WorkflowEvent";
import { WorkflowWidget } from "../entities/WorkflowWidget";
import { WorkflowLayout } from "../entities/WorkflowLayout";

import { initialMigration1650615859817 } from "./migrations/1650615859817-initialMigration";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    Workflow,
    WorkflowStep,
    WorkflowEvent,
    WorkflowWidget,
    WorkflowLayout,
  ],
  subscribers: [],
  migrations: [initialMigration1650615859817],
});

export default dataSource;
