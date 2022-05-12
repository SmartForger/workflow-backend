import { Field, InputType } from "type-graphql";
import {
  WorkflowLayout,
  WorkflowLayoutType,
} from "../../../entities/WorkflowLayout";

@InputType()
export class WorkflowLayoutCreateInput implements Partial<WorkflowLayout> {
  @Field()
  name: string;

  @Field()
  type: WorkflowLayoutType;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconFileName: string;

  @Field({ nullable: true })
  backgroundColor: string;

  @Field({ nullable: true })
  textColor: string;

  @Field({ nullable: true })
  visible: boolean;

  @Field()
  stepId: string;
}
