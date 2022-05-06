import { Field, InputType } from "type-graphql";
import { WorkflowLayout } from "../../../entities/WorkflowLayout";

@InputType()
export class WorkflowLayoutUpdateInput implements Partial<WorkflowLayout> {
  @Field()
  id: string;

  @Field({ nullable: true })
  title: string;

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

  @Field({ nullable: true })
  stepId: string;
}
