import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
import { Workflow } from "./Workflow";

@ObjectType()
@Entity()
export class WorkflowStep extends Base<Workflow> {
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
}
