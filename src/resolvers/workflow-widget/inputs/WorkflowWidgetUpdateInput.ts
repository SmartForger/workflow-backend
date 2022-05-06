import { Field, InputType } from "type-graphql";
import { WorkflowWidget } from "../../../entities/WorkflowWidget";

@InputType()
export class WorkflowWidgetUpdateInput implements Partial<WorkflowWidget> {
  @Field()
  id: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconFileName: string;

  @Field({ nullable: true })
  field: string;

  @Field({ nullable: true })
  updateEvent: string;

  @Field({ nullable: true })
  stepId: string;

  @Field({ nullable: true })
  layoutId: string;
}
