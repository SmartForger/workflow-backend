import { Field, InputType, Int } from "type-graphql";
import { WorkflowEvent } from "../../../entities/WorkflowEvent";

@InputType()
export class WorkflowEventCreateInput implements Partial<WorkflowEvent> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  targetId?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field()
  stepId: string;
}
