import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Workflow {
  @Field()
  id: string;

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

@InputType()
export class WorkflowUpdateInput implements Partial<Workflow> {
  @Field()
  id: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  subCategory: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  displayName: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconFileName: string;
}
