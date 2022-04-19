import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../types/Base";
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
  @ManyToOne(() => WorkflowStep, (step) => step.events, { onDelete: 'CASCADE' })
  @TypeormLoader()
  step: WorkflowStep;

  @Field(() => WorkflowLayout)
  @ManyToOne(() => WorkflowLayout, (layout) => layout.widgets, { onDelete: 'CASCADE' })
  @TypeormLoader()
  layout: WorkflowLayout;
}
