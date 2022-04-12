import { createParamDecorator } from "type-graphql";
import { EntityTarget } from "typeorm";
import { AppContext } from "../types/AppContext";

export function Repo<Entity>(target: EntityTarget<Entity>) {
  return createParamDecorator<AppContext>(({ context }) =>
    context.datasource.getRepository(target)
  );
}
