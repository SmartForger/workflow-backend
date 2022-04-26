import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";

import datasource from "./db/datasource";
import { WorkflowResolver } from "./resolvers/workflow.resolver";
import { WorkflowStepResolver } from "./resolvers/workflow-step.resolver";
import { WorkflowEventResolver } from "./resolvers/workflow-event.resolver";
import { WorkflowWidgetResolver } from "./resolvers/workflow-widget.resolver";
import { WorkflowLayoutResolver } from "./resolvers/workflow-layout.resolver";

async function main() {
  console.log(111, "DB_HOST", process.env.DB_HOST);
  console.log(111, "DB_PORT", process.env.DB_PORT);
  console.log(111, "DB_USER", process.env.DB_USER);
  console.log(111, "DB_PASSWORD", process.env.DB_PASSWORD);
  console.log(111, "DB_NAME", process.env.DB_NAME);

  const schema = await buildSchema({
    resolvers: [
      WorkflowResolver,
      WorkflowStepResolver,
      WorkflowEventResolver,
      WorkflowWidgetResolver,
      WorkflowLayoutResolver,
    ],
    emitSchemaFile: true,
  });

  const app = Express();
  await datasource.initialize();

  const server = new ApolloServer({
    schema,
    context: { datasource },
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: () => datasource,
      }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}/graphql`)
  );
}

main();
