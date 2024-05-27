import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolver/UserResolver";
import { ProjectResolver } from "./resolver/ProjectResolver";

async function startServer() {
  const app = express();
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

startServer();
