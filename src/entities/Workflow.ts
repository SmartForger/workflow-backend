import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowStep } from "./WorkflowStep";

@ObjectType()
@Entity()
export class Workflow extends Base<Workflow> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  subCategory: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  @Column({
    type: "varchar",
    length: 1024,
    transformer: {
      to: (value: string[] | null | undefined) => value ? value.join() : null,
      from: (value: string | null) => (value ? value.split(",") : []),
    },
    nullable: true,
  })
  mode: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  iconFileName: string;

  @Field(() => [WorkflowStep])
  @OneToMany(() => WorkflowStep, (step) => step.workflow, { lazy: true })
  @TypeormLoader()
  steps: Lazy<WorkflowStep[]>;
}
