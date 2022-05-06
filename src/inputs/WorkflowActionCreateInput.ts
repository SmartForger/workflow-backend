import { Field, InputType } from "type-graphql";
import { WorkflowAction, WorkflowActionType } from "../entities/WorkflowAction";

@InputType()
export class WorkflowActionCreateInput implements Partial<WorkflowAction> {
  @Field()
  type: WorkflowActionType;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  content: string;

  @Field(() => [String])
  categories: string[];
}
