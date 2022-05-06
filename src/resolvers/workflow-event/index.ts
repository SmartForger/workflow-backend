import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowEvent } from "../../entities/WorkflowEvent";
import { WorkflowStep } from "../../entities/WorkflowStep";
import { WorkflowEventUpdateInput } from "./inputs/WorkflowEventUpdateInput";
import { WorkflowEventCreateInput } from "./inputs/WorkflowEventCreateInput";

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

    await repository.save(event);

    return event;
  }

  @Mutation(() => WorkflowEvent, { nullable: true })
  async updateWorkflowEvent(
    @Arg("eventInput")
    { id, stepId, ...details }: WorkflowEventUpdateInput,
    @Repo(WorkflowEvent) repository: Repository<WorkflowEvent>
  ): Promise<WorkflowEvent | null> {
    const event = await repository.findOneBy({ id });

    if (!event) {
      return null;
    }

    Object.assign(event, details);

    if (stepId) {
      event.step = new WorkflowStep({ id: stepId });
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
}
