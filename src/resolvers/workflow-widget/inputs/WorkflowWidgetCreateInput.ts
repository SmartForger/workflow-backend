import { Field, InputType } from "type-graphql";
import { WorkflowWidget } from "../../../entities/WorkflowWidget";

@InputType()
export class WorkflowWidgetCreateInput implements Partial<WorkflowWidget> {
  @Field()
  type: string;

  @Field()
  displayName: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  iconFileName: string;

  @Field()
  field: string;

  @Field()
  updateEvent: string;

  @Field({ nullable: true })
  stepId: string;

  @Field({ nullable: true })
  layoutId: string;
}
