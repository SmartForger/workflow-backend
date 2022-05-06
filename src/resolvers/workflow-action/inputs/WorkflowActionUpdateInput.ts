import { Field, InputType } from "type-graphql";
import { WorkflowAction, WorkflowActionType } from "../../../entities/WorkflowAction";

@InputType()
export class WorkflowActionUpdateInput implements Partial<WorkflowAction> {
  @Field()
  id: string;

  @Field({ nullable: true })
  type: WorkflowActionType;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => [String], { nullable: true })
  components: string[];
}
