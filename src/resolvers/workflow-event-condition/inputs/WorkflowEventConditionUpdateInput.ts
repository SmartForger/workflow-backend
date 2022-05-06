import { Field, InputType } from "type-graphql";

@InputType()
export class WorkflowEventConditionUpdateInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  filterJson: string;

  @Field({ nullable: true })
  eventId: string;
}
