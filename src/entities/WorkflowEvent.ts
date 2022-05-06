import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Base } from "../types/Base";
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

  @Field()
  @Column()
  description: string;

  @Field(() => WorkflowStep, { nullable: true })
  @OneToOne(() => WorkflowStep, { nullable: true })
  @JoinColumn()
  target: WorkflowStep | null;

  @Field(() => WorkflowStep)
  @ManyToOne(() => WorkflowStep, (step) => step.events, { onDelete: "CASCADE" })
  @TypeormLoader()
  step: WorkflowStep;

  @Field(() => [WorkflowEventCondition])
  @OneToMany(() => WorkflowEventCondition, (condition) => condition.event)
  @TypeormLoader()
  conditions: WorkflowEventCondition[];

  @Field(() => [WorkflowEventAction])
  @OneToMany(() => WorkflowEventAction, (action) => action.event)
  @TypeormLoader()
  actions: WorkflowEventAction[];
}
