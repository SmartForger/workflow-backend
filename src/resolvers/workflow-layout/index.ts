import { v4 as uuid } from "uuid";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { Repository } from "typeorm";
import { WorkflowStep } from "../../entities/WorkflowStep";
import { WorkflowLayout } from "../../entities/WorkflowLayout";
import { WorkflowLayoutCreateInput } from "./inputs/WorkflowLayoutCreateInput";
import { WorkflowLayoutUpdateInput } from "./inputs/WorkflowLayoutUpdateInput";

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
    { id, ...details }: WorkflowLayoutUpdateInput,
    @Repo(WorkflowLayout) repository: Repository<WorkflowLayout>
  ): Promise<WorkflowLayout | null> {
    const layout = await repository.findOneBy({ id });

    if (!layout) {
      return null;
    }

    Object.assign(layout, details);

    if (details.stepId && layout.step.id !== details.stepId) {
      layout.step = new WorkflowStep({ id: details.stepId });
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
}
