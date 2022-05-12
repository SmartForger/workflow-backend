import { Field, InputType } from "type-graphql";
import { WorkflowStep } from "../../../entities/WorkflowStep";

@InputType()
export class WorkflowStepCreateInput implements Partial<WorkflowStep> {
  @Field()
  name: string;

  @Field({  nullable: true })
  description: string;

  @Field({  nullable: true })
  icon: string;

  @Field({  nullable: true })
  iconFileName: string;

  @Field()
  workflowId: string;
}
