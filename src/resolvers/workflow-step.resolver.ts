import { v4 as uuid } from "uuid";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../decorators/Repository";
import { Repository } from "typeorm";
import { WorkflowStepCreateInput } from "../inputs/WorkflowStepCreateInput";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowStepUpdateInput } from "../inputs/WorkflowStepUpdateInput";
import { Workflow } from "../entities/Workflow";

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
    { id, ...details }: WorkflowStepUpdateInput,
    @Repo(WorkflowStep) repository: Repository<WorkflowStep>
  ): Promise<WorkflowStep | null> {
    const step = await repository.findOneBy({ id });

    if (!step) {
      return null;
    }

    Object.assign(step, details);

    if (details.workflowId && step.workflow.id !== details.workflowId) {
      step.workflow = new Workflow({ id: details.workflowId });
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
