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

import { initialMigration1652127476241 } from "./migrations/1652127476241-initialMigration";
import { addLayoutType1652294337088 } from "./migrations/1652294337088-addLayoutType";
import { updateWorkflow1652351816632 } from "./migrations/1652351816632-updateWorkflow";
import { updateWorkflowStep1652352528267 } from "./migrations/1652352528267-updateWorkflowStep";
import { updateWorkflowEvent1652353327927 } from "./migrations/1652353327927-updateWorkflowEvent";
import { updateWorkflowLayout1652355753221 } from "./migrations/1652355753221-updateWorkflowLayout";
import { updateWorkflowWidget1652356454750 } from "./migrations/1652356454750-updateWorkflowWidget";
import { addOrderField1652416795498 } from "./migrations/1652416795498-addOrderField";
import { addExtraToWidget1652951747293 } from "./migrations/1652951747293-addExtraToWidget";
import { addRulesToWidget1652957356435 } from "./migrations/1652957356435-addRulesToWidget";

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
    initialMigration1652127476241,
    addLayoutType1652294337088,
    updateWorkflow1652351816632,
    updateWorkflowStep1652352528267,
    updateWorkflowEvent1652353327927,
    updateWorkflowLayout1652355753221,
    updateWorkflowWidget1652356454750,
    addOrderField1652416795498,
    addExtraToWidget1652951747293,
    addRulesToWidget1652957356435,
  ],
});

export default dataSource;
