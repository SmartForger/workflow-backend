import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import "dotenv/config";

import { getDataSource } from "./db/datasource";
import { WorkflowResolver } from "./resolvers/workflow.resolver";
import { WorkflowStepResolver } from "./resolvers/workflow-step.resolver";
import { WorkflowEventResolver } from "./resolvers/workflow-event.resolver";
import { WorkflowWidgetResolver } from "./resolvers/workflow-widget.resolver";
import { WorkflowLayoutResolver } from "./resolvers/workflow-layout.resolver";

async function main() {
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
  const datasource = await getDataSource();

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

  app.listen(4000, () =>
    console.log("Server is running on http://localhost:4000/graphql")
  );
}

main();
