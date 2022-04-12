import { Field, InputType } from "type-graphql";
import { Workflow } from "../entities/Workflow";

@InputType()
export class WorkflowCreateInput implements Partial<Workflow> {
  @Field()
  category: string;

  @Field()
  subCategory: string;

  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  iconFileName: string;
}
