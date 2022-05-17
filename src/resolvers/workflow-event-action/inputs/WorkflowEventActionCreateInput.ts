import { Field, InputType, Int } from "type-graphql";

@InputType()
export class WorkflowEventActionCreateInput {
  @Field()
  actionId: string;

  @Field()
  eventId: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
