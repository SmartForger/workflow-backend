import { v4 as uuid } from "uuid";
import { Query, Resolver, Mutation, Arg } from "type-graphql";
import {
  Workflow,
  WorkflowCreateInput,
  WorkflowUpdateInput,
} from "../schemas/Workflow";

@Resolver((of) => Workflow)
export class WorkflowResolver {
  private _workflows: Workflow[] = [];

  @Query(() => [Workflow], { nullable: true })
  workflows(): Workflow[] {
    return this._workflows;
  }

  @Query(() => Workflow, { nullable: true })
  workflow(@Arg("id") id: String): Workflow | null {
    const w = this._workflows.find((w) => w.id === id);
    return w || null;
  }

  @Mutation(() => Workflow)
  createWorkflow(
    @Arg("workflowInput")
    {
      category,
      subCategory,
      name,
      displayName,
      description,
      icon,
      iconFileName,
    }: WorkflowCreateInput
  ): Workflow {
    const workflow = {
      id: uuid(), // not really unique
      category,
      subCategory,
      name,
      displayName,
      description,
      icon,
      iconFileName,
    };

    this._workflows.push(workflow);
    return workflow;
  }

  @Mutation(() => Workflow, { nullable: true })
  updateWorkflow(
    @Arg("workflowInput")
    { id, ...details }: WorkflowUpdateInput
  ): Workflow | null {
    const index = this._workflows.findIndex((workflow) => workflow.id === id);

    if (index < 0) {
      return null;
    }

    this._workflows[index] = {
      ...this._workflows[index],
      ...details,
    };

    return this._workflows[index];
  }

  @Mutation(() => Workflow, { nullable: true })
  deleteWorkflow(
    @Arg("id")
    id: String
  ): Workflow | null {
    const index = this._workflows.findIndex((workflow) => workflow.id === id);

    if (index < 0) {
      return null;
    }

    const [workflow] = this._workflows.splice(index, 1);

    return workflow;
  }
}
