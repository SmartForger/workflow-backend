import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SignedURL {
  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  newFileName: string;

  @Field({ nullable: true })
  expiresAt: number;
}
