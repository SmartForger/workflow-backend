import { v4 as uuid } from "uuid";
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Workflow } from "../entities/Workflow";
import { AppContext } from "../types/AppContext";
import { Repo } from "../decorators/Repository";
import { Repository } from "typeorm";
import { WorkflowCreateInput } from "../inputs/WorkflowCreateInput";
import { WorkflowUpdateInput } from "../inputs/WorkflowUpdateInput";

@Resolver(() => Workflow)
export class WorkflowResolver {
  @Query(() => [Workflow], { nullable: true })
  workflows(
    @Repo(Workflow) repository: Repository<Workflow>
  ): Promise<Workflow[]> {
    return repository.find();
  }

  @Query(() => Workflow, { nullable: true })
  workflow(
    @Arg("id") id: string,
    @Repo(Workflow) repository: Repository<Workflow>
  ): Promise<Workflow | null> {
    return repository.findOneBy({ id });
  }

  @Mutation(() => Workflow)
  async createWorkflow(
    @Arg("workflowInput")
    workflowInput: WorkflowCreateInput,
    @Ctx() ctx: AppContext
  ): Promise<Workflow> {
    const repository = ctx.datasource.getRepository(Workflow);

    const workflow = new Workflow(workflowInput);
    workflow.id = uuid();

    await repository.save(workflow);

    return workflow;
  }

  @Mutation(() => Workflow, { nullable: true })
  async updateWorkflow(
    @Arg("workflowInput")
    { id, ...details }: WorkflowUpdateInput,
    @Repo(Workflow) repository: Repository<Workflow>
  ): Promise<Workflow | null> {
    const workflow = await repository.findOneBy({ id });

    if (!workflow) {
      return null;
    }

    Object.assign(workflow, details);

    await repository.save(workflow);

    return workflow;
  }

  @Mutation(() => Workflow, { nullable: true })
  async deleteWorkflow(
    @Arg("id") id: string,
    @Repo(Workflow) repository: Repository<Workflow>
  ): Promise<Workflow | null> {
    const workflow = await repository.findOneBy({ id });

    if (!workflow) {
      return null;
    }

    await repository.delete(workflow);

    return workflow;
  }
}
