import { Field, InputType, Int } from "type-graphql";

@InputType()
export class WorkflowEventConditionUpdateInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  filterJson?: string;

  @Field({ nullable: true })
  eventId?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
