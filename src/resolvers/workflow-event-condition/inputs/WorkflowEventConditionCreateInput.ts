import { Field, InputType, Int } from "type-graphql";

@InputType()
export class WorkflowEventConditionCreateInput {
  @Field()
  name: string;

  @Field()
  filterJson: string;

  @Field()
  eventId: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
