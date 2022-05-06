import { Field, InputType } from "type-graphql";

@InputType()
export class WorkflowEventConditionCreateInput {
  @Field()
  name: string;

  @Field()
  filterJson: string;

  @Field()
  eventId: string;
}
