import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../types/Base";
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

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [String])
  @Column({
    type: "varchar",
    length: 1024,
    transformer: {
      to: (value: string[]) => value.join(),
      from: (value: string | null) => value?.split(",") || [],
    },
  })
  mode: string[];

  @Field()
  @Column()
  icon: string;

  @Field()
  @Column()
  iconFileName: string;

  @Field(() => [WorkflowStep])
  @OneToMany(() => WorkflowStep, (step) => step.workflow)
  @TypeormLoader()
  steps: WorkflowStep[];
}
