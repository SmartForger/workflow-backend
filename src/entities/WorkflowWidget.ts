import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowLayout } from "./WorkflowLayout";
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
  name: string;

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
  @ManyToOne(() => WorkflowStep, (step) => step.events, {
    lazy: true,
    onDelete: "CASCADE",
  })
  step: Lazy<WorkflowStep>;

  @Field(() => WorkflowLayout)
  @ManyToOne(() => WorkflowLayout, (layout) => layout.widgets, {
    lazy: true,
    onDelete: "CASCADE",
  })
  layout: Lazy<WorkflowLayout>;
}
