import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowStep } from "../../entities/WorkflowStep";
import { Workflow } from "../../entities/Workflow";
import { WorkflowStepCreateInput } from "./inputs/WorkflowStepCreateInput";
import { WorkflowStepUpdateInput } from "./inputs/WorkflowStepUpdateInput";

@Resolver(() => WorkflowStep)
export class WorkflowStepResolver {
  @Mutation(() => WorkflowStep)
  async createWorkflowStep(
    @Arg("stepInput") stepInput: WorkflowStepCreateInput,
    @Repo(WorkflowStep) repository: Repository<WorkflowStep>
  ): Promise<WorkflowStep> {
    const step = new WorkflowStep(stepInput);
    step.id = uuid();
    step.workflow = new Workflow({ id: stepInput.workflowId });

    await repository.save(step);

    return step;
  }

  @Mutation(() => WorkflowStep, { nullable: true })
  async updateWorkflowStep(
    @Arg("stepInput")
    { id, workflowId, ...details }: WorkflowStepUpdateInput,
    @Repo(WorkflowStep) repository: Repository<WorkflowStep>
  ): Promise<WorkflowStep | null> {
    const step = await repository.findOneBy({ id });

    if (!step) {
      return null;
    }

    Object.assign(step, details);

    if (workflowId) {
      step.workflow = new Workflow({ id: workflowId });
    }

    await repository.save(step);

    return step;
  }

  @Mutation(() => WorkflowStep, { nullable: true })
  async deleteWorkflowStep(
    @Arg("id") id: string,
    @Repo(WorkflowStep) repository: Repository<WorkflowStep>
  ): Promise<WorkflowStep | null> {
    const step = await repository.findOneBy({ id });

    if (!step) {
      return null;
    }

    await repository.delete(step.id);

    return step;
  }
}
