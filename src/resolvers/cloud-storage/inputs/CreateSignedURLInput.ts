import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSignedURLInput {
  @Field()
  fileName: string;

  @Field()
  contentType: string;

  @Field()
  origin: string;
}
