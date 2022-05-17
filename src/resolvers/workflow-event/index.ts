import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowEvent } from "../../entities/WorkflowEvent";
import { WorkflowStep } from "../../entities/WorkflowStep";
import { WorkflowEventUpdateInput } from "./inputs/WorkflowEventUpdateInput";
import { WorkflowEventCreateInput } from "./inputs/WorkflowEventCreateInput";
import { OrderInput } from "../common/inputs/OrderInput";
import { OrderMutationResult } from "../common/types/OrderMutationResult";

@Resolver(() => WorkflowEvent)
export class WorkflowEventResolver {
  @Mutation(() => WorkflowEvent)
  async createWorkflowEvent(
    @Arg("eventInput") eventInput: WorkflowEventCreateInput,
    @Repo(WorkflowEvent) repository: Repository<WorkflowEvent>
  ): Promise<WorkflowEvent> {
    const event = new WorkflowEvent(eventInput);
    event.id = uuid();
    event.step = new WorkflowStep({ id: eventInput.stepId });
    if (eventInput.targetId) {
      event.target = new WorkflowStep({ id: eventInput.targetId });
    }

    await repository.save(event);

    return event;
  }

  @Mutation(() => WorkflowEvent, { nullable: true })
  async updateWorkflowEvent(
    @Arg("eventInput")
    { id, stepId, targetId, ...details }: WorkflowEventUpdateInput,
    @Repo(WorkflowEvent) repository: Repository<WorkflowEvent>,
    @Repo(WorkflowStep) stepRepository: Repository<WorkflowStep>
  ): Promise<WorkflowEvent | null> {
    const event = await repository.findOneBy({ id });

    if (!event) {
      return null;
    }

    Object.assign(event, details);

    if (stepId) {
      const step = await stepRepository.findOneBy({ id: stepId });
      if (step) {
        event.step = step;
      } else {
        throw new Error("Invalid stepId");
      }
    }
    if (targetId) {
      const target = await stepRepository.findOneBy({ id: targetId });
      event.target = target;
    }

    await repository.save(event);

    return event;
  }

  @Mutation(() => WorkflowEvent, { nullable: true })
  async deleteWorkflowEvent(
    @Arg("id") id: string,
    @Repo(WorkflowEvent) repository: Repository<WorkflowEvent>
  ): Promise<WorkflowEvent | null> {
    const event = await repository.findOneBy({ id });

    if (!event) {
      return null;
    }

    await repository.delete(event.id);

    return event;
  }

  @Mutation(() => OrderMutationResult, { nullable: true })
  async updateWorkflowEventsOrder(
    @Arg("orders", () => [OrderInput]) orders: OrderInput[],
    @Repo(WorkflowEvent) repository: Repository<WorkflowEvent>
  ): Promise<OrderMutationResult> {
    try {
      await repository.manager.transaction(async (manager) => {
        for (const order of orders) {
          await manager
            .createQueryBuilder()
            .update(WorkflowEvent)
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
