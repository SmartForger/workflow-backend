import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";
import { Base } from "../types/Base";

export enum WorkflowActionType {
  TRANSACTION = "transaction",
  MILESTONE = "milestone",
}

@ObjectType()
@Entity()
export class WorkflowAction extends Base<WorkflowAction> {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({
    type: "enum",
    enum: WorkflowActionType,
    default: WorkflowActionType.MILESTONE,
  })
  type: WorkflowActionType;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  content: string;

  @Field(() => [String])
  @Column({
    type: "varchar",
    length: 1024,
    transformer: {
      to: (value: string[]) => value.join(),
      from: (value: string | null) => value?.split(",") || [],
    },
  })
  categories: string[];
}
