import "dotenv/config";
import express, { Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import http from "http";

import resolvers from "./resolvers";
import schema from "./schema";
import * as models from "./models";

const app = express();
app.use(cors());

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_URI,
  MONGO_PORT,
  PORT = 3000,
} = process.env;

const start = async () => {
  if (!MONGO_USER) {
    throw new Error("mongodb username must be set");
  }

  if (!MONGO_PASS) {
    throw new Error("mongodb password must be set");
  }

  if (!MONGO_URI) {
    throw new Error("mongodb password must be set");
  }

  if (!MONGO_PORT) {
    throw new Error("mongodb port must be set");
  }

  try {
    await mongoose.connect(
      `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}:${MONGO_PORT}/sentiance`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("connected to MongoDb");

    const server = new ApolloServer({
      typeDefs: schema,
      resolvers,
      context: async ({ req }) => {
        return {
          models,
        };
      },
    });

    server.applyMiddleware({ app, path: "/graphql" });

    const httpServer = http.createServer(app);

    httpServer.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

start();
