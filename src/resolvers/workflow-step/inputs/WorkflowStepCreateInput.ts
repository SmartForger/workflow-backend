import { Field, InputType } from "type-graphql";
import { WorkflowStep } from "../../../entities/WorkflowStep";

@InputType()
export class WorkflowStepCreateInput implements Partial<WorkflowStep> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  iconFileName: string;

  @Field()
  workflowId: string;
}
