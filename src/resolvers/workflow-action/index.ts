import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowAction } from "../../entities/WorkflowAction";
import { WorkflowActionCreateInput } from "./inputs/WorkflowActionCreateInput";
import { WorkflowActionUpdateInput } from "./inputs/WorkflowActionUpdateInput";

@Resolver(() => WorkflowAction)
export class WorkflowActionResolver {
  @Query(() => [WorkflowAction], { nullable: true })
  workflowActions(@Repo(WorkflowAction) repository: Repository<WorkflowAction>): Promise<WorkflowAction[]> {
    return repository.find();
  }

  @Query(() => WorkflowAction, { nullable: true })
  workflowAction(
    @Arg("id") id: string,
    @Repo(WorkflowAction) repository: Repository<WorkflowAction>
  ): Promise<WorkflowAction | null> {
    return repository.findOneBy({ id });
  }

  @Mutation(() => WorkflowAction)
  async createWorkflowAction(
    @Arg("workflowActionInput")
    workflowActionInput: WorkflowActionCreateInput,
    @Repo(WorkflowAction) repository: Repository<WorkflowAction>
  ): Promise<WorkflowAction> {
    const workflowAction = new WorkflowAction(workflowActionInput);
    workflowAction.id = uuid();

    await repository.save(workflowAction);

    return workflowAction;
  }

  @Mutation(() => WorkflowAction, { nullable: true })
  async updateWorkflowAction(
    @Arg("workflowActionInput")
    { id, ...details }: WorkflowActionUpdateInput,
    @Repo(WorkflowAction) repository: Repository<WorkflowAction>
  ): Promise<WorkflowAction | null> {
    const workflowAction = await repository.findOneBy({ id });

    if (!workflowAction) {
      return null;
    }

    Object.assign(workflowAction, details);

    await repository.save(workflowAction);

    return workflowAction;
  }

  @Mutation(() => WorkflowAction, { nullable: true })
  async deleteWorkflowAction(
    @Arg("id") id: string,
    @Repo(WorkflowAction) repository: Repository<WorkflowAction>
  ): Promise<WorkflowAction | null> {
    const workflowAction = await repository.findOneBy({ id });

    if (!workflowAction) {
      return null;
    }

    await repository.delete(workflowAction.id);

    return workflowAction;
  }
}
