import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowAction } from "./WorkflowAction";
import { WorkflowEvent } from "./WorkflowEvent";

@ObjectType()
@Entity()
export class WorkflowEventAction extends Base<WorkflowEventAction> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => WorkflowAction, { nullable: true })
  @ManyToOne(() => WorkflowAction, (action) => action.eventActions, {
    lazy: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @TypeormLoader()
  info: Lazy<WorkflowAction | null>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  order: number;

  @Field(() => WorkflowEvent)
  @ManyToOne(() => WorkflowEvent, (event) => event.conditions, {
    lazy: true,
    onDelete: "CASCADE",
  })
  event: Lazy<WorkflowEvent>;
}
