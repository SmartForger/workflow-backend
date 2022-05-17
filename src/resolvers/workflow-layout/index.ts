import { v4 as uuid } from "uuid";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { Repository } from "typeorm";
import { WorkflowStep } from "../../entities/WorkflowStep";
import { WorkflowLayout } from "../../entities/WorkflowLayout";
import { WorkflowLayoutCreateInput } from "./inputs/WorkflowLayoutCreateInput";
import { WorkflowLayoutUpdateInput } from "./inputs/WorkflowLayoutUpdateInput";
import { OrderMutationResult } from "../common/types/OrderMutationResult";
import { OrderInput } from "../common/inputs/OrderInput";

@Resolver(() => WorkflowLayout)
export class WorkflowLayoutResolver {
  @Mutation(() => WorkflowLayout)
  async createWorkflowLayout(
    @Arg("layoutInput") layoutInput: WorkflowLayoutCreateInput,
    @Repo(WorkflowLayout) repository: Repository<WorkflowLayout>
  ): Promise<WorkflowLayout> {
    const layout = new WorkflowLayout(layoutInput);
    layout.id = uuid();
    layout.step = new WorkflowStep({ id: layoutInput.stepId });

    await repository.save(layout);

    return layout;
  }

  @Mutation(() => WorkflowLayout, { nullable: true })
  async updateWorkflowLayout(
    @Arg("layoutInput")
    { id, stepId, ...details }: WorkflowLayoutUpdateInput,
    @Repo(WorkflowLayout) repository: Repository<WorkflowLayout>
  ): Promise<WorkflowLayout | null> {
    const layout = await repository.findOneBy({ id });

    if (!layout) {
      return null;
    }

    Object.assign(layout, details);

    if (stepId) {
      layout.step = new WorkflowStep({ id: stepId });
    }

    await repository.save(layout);

    return layout;
  }

  @Mutation(() => WorkflowLayout, { nullable: true })
  async deleteWorkflowLayout(
    @Arg("id") id: string,
    @Repo(WorkflowLayout) repository: Repository<WorkflowLayout>
  ): Promise<WorkflowLayout | null> {
    const layout = await repository.findOneBy({ id });

    if (!layout) {
      return null;
    }

    await repository.delete(layout.id);

    return layout;
  }

  @Mutation(() => OrderMutationResult, { nullable: true })
  async updateWorkflowLayoutsOrder(
    @Arg("orders", () => [OrderInput]) orders: OrderInput[],
    @Repo(WorkflowLayout) repository: Repository<WorkflowLayout>
  ): Promise<OrderMutationResult> {
    try {
      await repository.manager.transaction(async (manager) => {
        for (const order of orders) {
          await manager
            .createQueryBuilder()
            .update(WorkflowLayout)
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
