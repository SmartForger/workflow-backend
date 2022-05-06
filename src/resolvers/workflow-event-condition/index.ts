import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Repo } from "../../decorators/Repository";
import { WorkflowEventConditionCreateInput } from "./inputs/WorkflowEventConditionCreateInput";
import { WorkflowEventConditionUpdateInput } from "./inputs/WorkflowEventConditionUpdateInput";
import { WorkflowEventCondition } from "../../entities/WorkflowEventCondition";
import { WorkflowEvent } from "../../entities/WorkflowEvent";

@Resolver(() => WorkflowEventCondition)
export class WorkflowEventConditionResolver {
  @Mutation(() => WorkflowEventCondition)
  async createWorkflowEventCondition(
    @Arg("input") { eventId, ...input }: WorkflowEventConditionCreateInput,
    @Repo(WorkflowEventCondition) repository: Repository<WorkflowEvent>
  ): Promise<WorkflowEventCondition> {
    const eventCondition = new WorkflowEventCondition({
      id: uuid(),
      ...input,
    });
    eventCondition.event = new WorkflowEvent({ id: eventId });

    await repository.save(eventCondition);

    return eventCondition;
  }

  @Mutation(() => WorkflowEventCondition, { nullable: true })
  async updateWorkflowEventCondition(
    @Arg("input")
    { id, eventId, ...details }: WorkflowEventConditionUpdateInput,
    @Repo(WorkflowEventCondition) repository: Repository<WorkflowEventCondition>
  ): Promise<WorkflowEventCondition | null> {
    const eventCondition = await repository.findOneBy({ id });

    if (!eventCondition) {
      return null;
    }

    Object.assign(eventCondition, details);

    if (eventId) {
      eventCondition.event = new WorkflowEvent({ id: eventId });
    }

    await repository.save(eventCondition);

    return eventCondition;
  }

  @Mutation(() => WorkflowEventCondition, { nullable: true })
  async deleteWorkflowEventCondition(
    @Arg("id") id: string,
    @Repo(WorkflowEventCondition) repository: Repository<WorkflowEventCondition>
  ): Promise<WorkflowEventCondition | null> {
    const eventCondition = await repository.findOneBy({ id });

    if (!eventCondition) {
      return null;
    }

    await repository.delete(eventCondition.id);

    return eventCondition;
  }
}
