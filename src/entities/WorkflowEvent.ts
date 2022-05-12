import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowEventAction } from "./WorkflowEventAction";
import { WorkflowEventCondition } from "./WorkflowEventCondition";
import { WorkflowStep } from "./WorkflowStep";

@ObjectType()
@Entity()
export class WorkflowEvent extends Base<WorkflowEvent> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => WorkflowStep, { nullable: true })
  @ManyToOne(() => WorkflowStep, (action) => action.targetedEvents, {
    lazy: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @TypeormLoader()
  target: Lazy<WorkflowStep | null>;

  @Field(() => WorkflowStep)
  @ManyToOne(() => WorkflowStep, (step) => step.events, {
    lazy: true,
    onDelete: "CASCADE",
  })
  step: Lazy<WorkflowStep>;

  @Field(() => [WorkflowEventCondition])
  @OneToMany(() => WorkflowEventCondition, (condition) => condition.event, {
    lazy: true,
  })
  @TypeormLoader()
  conditions: Lazy<WorkflowEventCondition[]>;

  @Field(() => [WorkflowEventAction])
  @OneToMany(() => WorkflowEventAction, (action) => action.event, {
    lazy: true,
  })
  @TypeormLoader()
  actions: Lazy<WorkflowEventAction[]>;
}
