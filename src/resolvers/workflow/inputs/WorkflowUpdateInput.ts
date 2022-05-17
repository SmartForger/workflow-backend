import { Field, InputType, Int } from "type-graphql";
import { Workflow } from "../../../entities/Workflow";

@InputType()
export class WorkflowUpdateInput implements Partial<Workflow> {
  @Field()
  id: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  subCategory?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  mode?: string[];

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  iconFileName?: string;
}
