import { Field, InputType } from "type-graphql";

@InputType()
export class WorkflowEventActionCreateInput {
  @Field()
  actionId: string;

  @Field()
  eventId: string;
}
