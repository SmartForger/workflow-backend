import { v4 as uuid } from "uuid";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { AppContext } from "../types/AppContext";
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
    @Arg("workflowStepInput")
    workflowStepInput: WorkflowStepCreateInput,
    @Ctx() ctx: AppContext
  ): Promise<WorkflowStep> {
    const repository = ctx.datasource.getRepository(WorkflowStep);

    const workflowStep = new WorkflowStep(workflowStepInput);
    workflowStep.id = uuid();
    workflowStep.workflow = new Workflow({ id: workflowStepInput.workflowId });

    await repository.save(workflowStep);

    return workflowStep;
  }

  @Mutation(() => WorkflowStep, { nullable: true })
  async updateWorkflowStep(
    @Arg("workflowStepInput")
    { id, ...details }: WorkflowStepUpdateInput,
    @Repo(WorkflowStep) stepRepository: Repository<WorkflowStep>,
  ): Promise<WorkflowStep | null> {
    const step = await stepRepository.findOneBy({ id });

    if (!step) {
      return null;
    }

    Object.assign(step, details);

    if (details.workflowId && step.workflow.id !== details.workflowId) {
      step.workflow = new Workflow({ id: details.workflowId });
    }

    await stepRepository.save(step);

    return step;
  }

  @Mutation(() => WorkflowStep, { nullable: true })
  async deleteWorkflowStep(
    @Arg("id") id: string,
    @Repo(WorkflowStep) repository: Repository<WorkflowStep>
  ): Promise<WorkflowStep | null> {
    const workflow = await repository.findOneBy({ id });

    if (!workflow) {
      return null;
    }

    await repository.delete(workflow);

    return workflow;
  }
}
