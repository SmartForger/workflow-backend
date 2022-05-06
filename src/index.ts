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
import { CloudStorageResolver } from "./resolvers/cloud-storage.resolver";
import { WorkflowActionResolver } from "./resolvers/workflow-action.resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [
      WorkflowResolver,
      WorkflowStepResolver,
      WorkflowEventResolver,
      WorkflowWidgetResolver,
      WorkflowLayoutResolver,
      CloudStorageResolver,
      WorkflowActionResolver,
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
