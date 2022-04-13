import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../types/Base";
import { Workflow } from "./Workflow";
import { WorkflowEvent } from "./WorkflowEvent";

@ObjectType()
@Entity()
export class WorkflowStep extends Base<WorkflowStep> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

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

  @Field(() => Workflow)
  @ManyToOne(() => Workflow, (workflow) => workflow.steps)
  @TypeormLoader()
  workflow: Workflow;

  @Field(() => [WorkflowEvent])
  @OneToMany(() => WorkflowEvent, (event) => event.step)
  @TypeormLoader()
  events: WorkflowStep[];
}
