import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowEvent } from "./WorkflowEvent";

@ObjectType()
@Entity()
export class WorkflowEventCondition extends Base<WorkflowEventCondition> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  filterJson: string;

  @Field(() => WorkflowEvent)
  @ManyToOne(() => WorkflowEvent, (event) => event.conditions, {
    onDelete: "CASCADE",
    lazy: true,
  })
  event: Lazy<WorkflowEvent>;
}
