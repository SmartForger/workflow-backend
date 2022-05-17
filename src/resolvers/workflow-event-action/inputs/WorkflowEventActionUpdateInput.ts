import { Field, InputType, Int } from "type-graphql";

@InputType()
export class WorkflowEventActionUpdateInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  actionId?: string;

  @Field({ nullable: true })
  eventId?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
