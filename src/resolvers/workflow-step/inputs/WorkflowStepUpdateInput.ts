import { Field, InputType, Int } from "type-graphql";
import { WorkflowStep } from "../../../entities/WorkflowStep";

@InputType()
export class WorkflowStepUpdateInput implements Partial<WorkflowStep> {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  iconFileName?: string;

  @Field({ nullable: true })
  workflowId?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
