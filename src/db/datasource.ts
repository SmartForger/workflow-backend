import { DataSource } from "typeorm";
import "dotenv/config";

import { WorkflowAction } from "../entities/WorkflowAction";
import { Workflow } from "../entities/Workflow";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowEvent } from "../entities/WorkflowEvent";
import { WorkflowWidget } from "../entities/WorkflowWidget";
import { WorkflowLayout } from "../entities/WorkflowLayout";
import { WorkflowEventAction } from "../entities/WorkflowEventAction";
import { WorkflowEventCondition } from "../entities/WorkflowEventCondition";

import { initialMigration1650615859817 } from "./migrations/1650615859817-initialMigration";
import { addEntitiesAndRelations1651834100399 } from "./migrations/1651834100399-addEntitiesAndRelations";

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
    WorkflowAction,
    WorkflowEventAction,
    WorkflowEventCondition,
  ],
  subscribers: [],
  migrations: [
    initialMigration1650615859817,
    addEntitiesAndRelations1651834100399,
  ],
});

export default dataSource;
