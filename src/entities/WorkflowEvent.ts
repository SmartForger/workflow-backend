import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
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

  @Field()
  @Column()
  action: string;

  @Field()
  @Column()
  condition: string;

  @Field(() => WorkflowStep)
  @ManyToOne(() => WorkflowStep, (step) => step.events)
  @TypeormLoader()
  step: WorkflowStep;
}
