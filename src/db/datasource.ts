import { DataSource } from "typeorm";

import { Workflow } from "../entities/Workflow";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowEvent } from "../entities/WorkflowEvent";
import { WorkflowWidget } from "../entities/WorkflowWidget";
import { WorkflowLayout } from "../entities/WorkflowLayout";

export const getDataSource = () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
      Workflow,
      WorkflowStep,
      WorkflowEvent,
      WorkflowWidget,
      WorkflowLayout,
    ],
    subscribers: [],
    migrations: [],
  });

  return dataSource.initialize();
};
