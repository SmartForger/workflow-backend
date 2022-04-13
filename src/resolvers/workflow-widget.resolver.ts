import { v4 as uuid } from "uuid";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../decorators/Repository";
import { Repository } from "typeorm";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowWidget } from "../entities/WorkflowWidget";
import { WorkflowWidgetCreateInput } from "../inputs/WorkflowWidgetCreateInput";
import { WorkflowWidgetUpdateInput } from "../inputs/WorkflowWidgetUpdateInput";

@Resolver(() => WorkflowWidget)
export class WorkflowWidgetResolver {
  @Mutation(() => WorkflowWidget)
  async createWorkflowWidget(
    @Arg("widgetInput") widgetInput: WorkflowWidgetCreateInput,
    @Repo(WorkflowWidget) repository: Repository<WorkflowWidget>
  ): Promise<WorkflowWidget> {
    const widget = new WorkflowWidget(widgetInput);
    widget.id = uuid();
    widget.step = new WorkflowStep({ id: widgetInput.stepId });

    await repository.save(widget);

    return widget;
  }

  @Mutation(() => WorkflowWidget, { nullable: true })
  async updateWorkflowWidget(
    @Arg("widgetInput")
    { id, ...details }: WorkflowWidgetUpdateInput,
    @Repo(WorkflowWidget) repository: Repository<WorkflowWidget>
  ): Promise<WorkflowWidget | null> {
    const widget = await repository.findOneBy({ id });

    if (!widget) {
      return null;
    }

    Object.assign(widget, details);

    if (details.stepId && widget.step.id !== details.stepId) {
      widget.step = new WorkflowStep({ id: details.stepId });
    }

    await repository.save(widget);

    return widget;
  }

  @Mutation(() => WorkflowWidget, { nullable: true })
  async deleteWorkflowWidget(
    @Arg("id") id: string,
    @Repo(WorkflowWidget) repository: Repository<WorkflowWidget>
  ): Promise<WorkflowWidget | null> {
    const widget = await repository.findOneBy({ id });

    if (!widget) {
      return null;
    }

    await repository.delete(widget);

    return widget;
  }
}
