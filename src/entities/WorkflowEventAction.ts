import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
import { WorkflowAction } from "./WorkflowAction";
import { WorkflowEvent } from "./WorkflowEvent";

@ObjectType()
@Entity()
export class WorkflowEventAction extends Base<WorkflowEventAction> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => WorkflowAction)
  @ManyToOne(() => WorkflowAction, (action) => action.eventActions, {
    onDelete: "CASCADE",
  })
  @TypeormLoader()
  info: WorkflowAction;

  @Field(() => WorkflowEvent)
  @ManyToOne(() => WorkflowEvent, (event) => event.conditions, {
    onDelete: "CASCADE",
  })
  @TypeormLoader()
  event: WorkflowEvent;
}
