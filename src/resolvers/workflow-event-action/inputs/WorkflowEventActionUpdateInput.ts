import { Field, InputType } from "type-graphql";

@InputType()
export class WorkflowEventActionUpdateInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  actionId: string;

  @Field({ nullable: true })
  eventId: string;
}
