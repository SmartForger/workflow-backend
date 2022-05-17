import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { WorkflowStep } from "./WorkflowStep";
import { WorkflowWidget } from "./WorkflowWidget";

export enum WorkflowLayoutType {
  HEADER = "header",
  FOOTER = "footer",
}

@ObjectType()
@Entity()
export class WorkflowLayout extends Base<WorkflowLayout> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  iconFileName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  backgroundColor: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  textColor: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  visible: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  order: number;

  @Field()
  @Column({
    type: "enum",
    enum: WorkflowLayoutType,
    default: WorkflowLayoutType.HEADER,
  })
  type: WorkflowLayoutType;

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
