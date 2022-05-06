import { Field, InputType } from "type-graphql";
import { WorkflowEvent } from "../../../entities/WorkflowEvent";

@InputType()
export class WorkflowEventCreateInput implements Partial<WorkflowEvent> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  stepId: string;
}