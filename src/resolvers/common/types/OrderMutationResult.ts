import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class OrderMutationResult {
  @Field()
  updated: boolean;
}
