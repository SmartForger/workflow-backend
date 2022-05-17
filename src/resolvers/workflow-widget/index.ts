import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowStep } from "../../entities/WorkflowStep";
import { WorkflowWidget } from "../../entities/WorkflowWidget";
import { WorkflowWidgetCreateInput } from "./inputs/WorkflowWidgetCreateInput";
import { WorkflowWidgetUpdateInput } from "./inputs/WorkflowWidgetUpdateInput";
import { WorkflowLayout } from "../../entities/WorkflowLayout";
import { OrderMutationResult } from "../common/types/OrderMutationResult";
import { OrderInput } from "../common/inputs/OrderInput";

@Resolver(() => WorkflowWidget)
export class WorkflowWidgetResolver {
  @Mutation(() => WorkflowWidget)
  async createWorkflowWidget(
    @Arg("widgetInput") widgetInput: WorkflowWidgetCreateInput,
    @Repo(WorkflowWidget) repository: Repository<WorkflowWidget>
  ): Promise<WorkflowWidget> {
    const widget = new WorkflowWidget(widgetInput);
    widget.id = uuid();

    if (widgetInput.layoutId) {
      widget.layout = new WorkflowLayout({ id: widgetInput.layoutId });
    }
    if (widgetInput.stepId) {
      widget.step = new WorkflowStep({ id: widgetInput.stepId });
    }

    await repository.save(widget);

    return widget;
  }

  @Mutation(() => WorkflowWidget, { nullable: true })
  async updateWorkflowWidget(
    @Arg("widgetInput")
    { id, stepId, ...details }: WorkflowWidgetUpdateInput,
    @Repo(WorkflowWidget) repository: Repository<WorkflowWidget>
  ): Promise<WorkflowWidget | null> {
    const widget = await repository.findOneBy({ id });

    if (!widget) {
      return null;
    }

    Object.assign(widget, details);

    if (stepId) {
      widget.step = new WorkflowStep({ id: stepId });
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

    await repository.delete(widget.id);

    return widget;
  }

  @Mutation(() => OrderMutationResult, { nullable: true })
  async updateWorkflowWidgetsOrder(
    @Arg("orders", () => [OrderInput]) orders: OrderInput[],
    @Repo(WorkflowWidget) repository: Repository<WorkflowWidget>
  ): Promise<OrderMutationResult> {
    try {
      await repository.manager.transaction(async (manager) => {
        for (const order of orders) {
          await manager
            .createQueryBuilder()
            .update(WorkflowWidget)
            .set({ order: order.order })
            .where({ id: order.id })
            .execute();
        }
      });
      return { updated: true };
    } catch {
      return { updated: false };
    }
  }
}
