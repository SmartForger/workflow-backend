import { Field, InputType, Int } from "type-graphql";
import { WorkflowEvent } from "../../../entities/WorkflowEvent";

@InputType()
export class WorkflowEventUpdateInput implements Partial<WorkflowEvent> {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  targetId?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  stepId: string;
}
