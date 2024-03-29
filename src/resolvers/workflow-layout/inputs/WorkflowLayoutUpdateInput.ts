import { Field, InputType, Int } from "type-graphql";
import {
  WorkflowLayout,
  WorkflowLayoutType,
} from "../../../entities/WorkflowLayout";

@InputType()
export class WorkflowLayoutUpdateInput implements Partial<WorkflowLayout> {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: WorkflowLayoutType;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  iconFileName?: string;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  textColor?: string;

  @Field({ nullable: true })
  visible?: boolean;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  stepId?: string;
}
