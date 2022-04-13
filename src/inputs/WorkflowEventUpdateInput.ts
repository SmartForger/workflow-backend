import { Field, InputType } from "type-graphql";
import { WorkflowEvent } from "../entities/WorkflowEvent";

@InputType()
export class WorkflowEventUpdateInput implements Partial<WorkflowEvent> {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  action: string;

  @Field({ nullable: true })
  condition: string;

  @Field({ nullable: true })
  stepId: string;
}