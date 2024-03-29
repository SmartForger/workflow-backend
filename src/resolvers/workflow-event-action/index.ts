import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowEventActionCreateInput } from "./inputs/WorkflowEventActionCreateInput";
import { WorkflowEventActionUpdateInput } from "./inputs/WorkflowEventActionUpdateInput";
import { WorkflowEventAction } from "../../entities/WorkflowEventAction";
import { WorkflowAction } from "../../entities/WorkflowAction";
import { WorkflowEvent } from "../../entities/WorkflowEvent";
import { OrderMutationResult } from "../common/types/OrderMutationResult";
import { OrderInput } from "../common/inputs/OrderInput";

@Resolver(() => WorkflowEventAction)
export class WorkflowEventActionResolver {
  @Mutation(() => WorkflowEventAction)
  async createWorkflowEventAction(
    @Arg("input") input: WorkflowEventActionCreateInput,
    @Repo(WorkflowEventAction) repository: Repository<WorkflowEvent>
  ): Promise<WorkflowEventAction> {
    const eventAction = new WorkflowEventAction({
      id: uuid(),
    });
    eventAction.event = new WorkflowEvent({ id: input.eventId });
    eventAction.info = new WorkflowAction({ id: input.actionId });

    await repository.save(eventAction);

    return eventAction;
  }

  @Mutation(() => WorkflowEventAction, { nullable: true })
  async updateWorkflowEventAction(
    @Arg("input")
    { id, eventId, actionId }: WorkflowEventActionUpdateInput,
    @Repo(WorkflowEventAction) repository: Repository<WorkflowEventAction>
  ): Promise<WorkflowEventAction | null> {
    const eventAction = await repository.findOneBy({ id });

    if (!eventAction) {
      return null;
    }

    if (eventId) {
      eventAction.event = new WorkflowEvent({ id: eventId });
    }
    if (actionId) {
      eventAction.info = new WorkflowAction({ id: actionId });
    }

    await repository.save(eventAction);

    return eventAction;
  }

  @Mutation(() => WorkflowEventAction, { nullable: true })
  async deleteWorkflowEventAction(
    @Arg("id") id: string,
    @Repo(WorkflowEventAction) repository: Repository<WorkflowEventAction>
  ): Promise<WorkflowEventAction | null> {
    const eventAction = await repository.findOneBy({ id });

    if (!eventAction) {
      return null;
    }

    await repository.delete(eventAction.id);

    return eventAction;
  }

  @Mutation(() => OrderMutationResult, { nullable: true })
  async updateWorkflowEventActionsOrder(
    @Arg("orders", () => [OrderInput]) orders: OrderInput[],
    @Repo(WorkflowEventAction) repository: Repository<WorkflowEventAction>
  ): Promise<OrderMutationResult> {
    try {
      await repository.manager.transaction(async (manager) => {
        for (const order of orders) {
          await manager
            .createQueryBuilder()
            .update(WorkflowEventAction)
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
