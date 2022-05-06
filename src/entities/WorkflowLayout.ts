import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowStep } from "./WorkflowStep";
import { WorkflowWidget } from "./WorkflowWidget";

@ObjectType()
@Entity()
export class WorkflowLayout extends Base<WorkflowLayout> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  icon: string;

  @Field()
  @Column()
  iconFileName: string;

  @Field()
  @Column()
  backgroundColor: string;

  @Field()
  @Column()
  textColor: string;

  @Field()
  @Column()
  visible: boolean;

  @Field(() => WorkflowStep)
  @ManyToOne(() => WorkflowStep, (step) => step.layouts, {
    lazy: true,
    onDelete: "CASCADE",
  })
  step: Lazy<WorkflowStep>;

  @Field(() => [WorkflowWidget])
  @OneToMany(() => WorkflowWidget, (widget) => widget.layout, { lazy: true })
  @TypeormLoader()
  widgets: Lazy<WorkflowWidget[]>;
}
