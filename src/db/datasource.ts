import { DataSource } from "typeorm";
import "dotenv/config";

import { WorkflowAction } from "../entities/WorkflowAction";
import { Workflow } from "../entities/Workflow";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowEvent } from "../entities/WorkflowEvent";
import { WorkflowWidget } from "../entities/WorkflowWidget";
import { WorkflowLayout } from "../entities/WorkflowLayout";

import { initialMigration1650615859817 } from "./migrations/1650615859817-initialMigration";
import { addWorkflowAction1651692610477 } from "./migrations/1651692610477-addWorkflowAction";
import { changeCategoriesToComponents1651740691367 } from "./migrations/1651740691367-changeCategoriesToComponents";
import { WorkflowEventAction } from "../entities/WorkflowEventAction";
import { WorkflowEventCondition } from "../entities/WorkflowEventCondition";
import { addEventConditionAndEventAction1651748549078 } from "./migrations/1651748549078-addEventConditionAndEventAction";
import { updateInfoField1651774264695 } from "./migrations/1651774264695-updateInfoField";
import { updateInfoField1651774832122 } from "./migrations/1651774832122-updateInfoField";
import { addTargetToEvent1651788911054 } from "./migrations/1651788911054-addTargetToEvent";

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
    addWorkflowAction1651692610477,
    changeCategoriesToComponents1651740691367,
    addEventConditionAndEventAction1651748549078,
    updateInfoField1651774264695,
    updateInfoField1651774832122,
    addTargetToEvent1651788911054,
  ],
});

export default dataSource;
