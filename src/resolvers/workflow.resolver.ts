import { v4 as uuid } from "uuid";
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import {
  Workflow,
  WorkflowCreateInput,
  WorkflowUpdateInput,
} from "../schemas/Workflow";
import { AppContext } from "../types/AppContext";
import { WorkflowModel } from "../db/models/WorkflowModel";
import { Repo } from "../decorators/Repository";
import { Repository } from "typeorm";

@Resolver(() => Workflow)
export class WorkflowResolver {
  @Query(() => [Workflow], { nullable: true })
  workflows(
    @Repo(WorkflowModel) repository: Repository<WorkflowModel>
  ): Promise<Workflow[]> {
    return repository.find();
  }

  @Query(() => Workflow, { nullable: true })
  workflow(
    @Arg("id") id: string,
    @Repo(WorkflowModel) repository: Repository<WorkflowModel>
  ): Promise<Workflow | null> {
    return repository.findOneBy({ id });
  }

  @Mutation(() => Workflow)
  async createWorkflow(
    @Arg("workflowInput")
    {
      category,
      subCategory,
      name,
      displayName,
      description,
      icon,
      iconFileName,
    }: WorkflowCreateInput,
    @Ctx() ctx: AppContext
  ): Promise<Workflow> {
    const repository = ctx.datasource.getRepository(WorkflowModel);

    const workflow = new WorkflowModel();
    workflow.id = uuid();
    workflow.category = category;
    workflow.subCategory = subCategory;
    workflow.name = name;
    workflow.displayName = displayName;
    workflow.description = description;
    workflow.icon = icon;
    workflow.iconFileName = iconFileName;

    await repository.save(workflow);

    return workflow;
  }

  @Mutation(() => Workflow, { nullable: true })
  async updateWorkflow(
    @Arg("workflowInput")
    { id, ...details }: WorkflowUpdateInput,
    @Repo(WorkflowModel) repository: Repository<WorkflowModel>
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
    @Repo(WorkflowModel) repository: Repository<WorkflowModel>
  ): Promise<Workflow | null> {
    const workflow = await repository.findOneBy({ id });

    if (!workflow) {
      return null;
    }

    await repository.delete(workflow);

    return workflow;
  }
}
