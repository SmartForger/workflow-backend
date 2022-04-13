import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
import { WorkflowStep } from "./WorkflowStep";

@ObjectType()
@Entity()
export class WorkflowWidget extends Base<WorkflowWidget> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  icon: string;

  @Field()
  @Column()
  iconFileName: string;

  @Field()
  @Column()
  field: string;

  @Field()
  @Column()
  updateEvent: string;

  @Field(() => WorkflowStep)
  @ManyToOne(() => WorkflowStep, (step) => step.events)
  @TypeormLoader()
  step: WorkflowStep;
}
