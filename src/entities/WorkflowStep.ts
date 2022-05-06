import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../types/Base";
import { Lazy } from "../types/Lazy";
import { Workflow } from "./Workflow";
import { WorkflowEvent } from "./WorkflowEvent";
import { WorkflowLayout } from "./WorkflowLayout";
import { WorkflowWidget } from "./WorkflowWidget";

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
  description: string;

  @Field()
  @Column()
  icon: string;

  @Field()
  @Column()
  iconFileName: string;

  @Field(() => Workflow)
  @ManyToOne(() => Workflow, (workflow) => workflow.steps, {
    lazy: true,
    onDelete: "CASCADE",
  })
  workflow: Lazy<Workflow>;

  @Field(() => [WorkflowEvent])
  @OneToMany(() => WorkflowEvent, (event) => event.step, {
    lazy: true,
  })
  @TypeormLoader()
  events: Lazy<WorkflowEvent[]>;

  @Field(() => [WorkflowWidget])
  @OneToMany(() => WorkflowWidget, (widget) => widget.step, { lazy: true })
  @TypeormLoader()
  widgets: Lazy<WorkflowWidget[]>;

  @Field(() => [WorkflowLayout])
  @OneToMany(() => WorkflowLayout, (layout) => layout.step, { lazy: true })
  @TypeormLoader()
  layouts: Lazy<WorkflowLayout[]>;

  @Field(() => [WorkflowEvent])
  @OneToMany(() => WorkflowEvent, (event) => event.target, { lazy: true })
  targetedEvents: Lazy<WorkflowEvent[]>;
}
