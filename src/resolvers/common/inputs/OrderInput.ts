import { Field, InputType, Int } from "type-graphql";

@InputType()
export class OrderInput {
  @Field()
  id: string;

  @Field(() => Int)
  order: number;
}
