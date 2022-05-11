import { Field, InputType } from "type-graphql";
import {
  WorkflowLayout,
  WorkflowLayoutType,
} from "../../../entities/WorkflowLayout";

@InputType()
export class WorkflowLayoutCreateInput implements Partial<WorkflowLayout> {
  @Field()
  title: string;

  @Field()
  icon: string;

  @Field()
  type: WorkflowLayoutType;

  @Field()
  iconFileName: string;

  @Field()
  backgroundColor: string;

  @Field()
  textColor: string;

  @Field()
  visible: boolean;

  @Field()
  stepId: string;
}
