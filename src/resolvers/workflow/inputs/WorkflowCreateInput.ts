import { Field, InputType } from "type-graphql";
import { Workflow } from "../../../entities/Workflow";

@InputType()
export class WorkflowCreateInput implements Partial<Workflow> {
  @Field()
  category: string;

  @Field()
  subCategory: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  mode: string[];

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconFileName: string;
}
