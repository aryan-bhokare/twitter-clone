import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { prismaClient } from "../client/db";
import { User } from "./user";
import cors from "cors";
import { JWTService } from "./services/jwt";
import { GraphQLContext } from "../interfaces";

async function testConnection() {
    try {
        await prismaClient.$connect();
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

testConnection();

export async function initServer() {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    const graphqlServer = new ApolloServer<GraphQLContext>({
        typeDefs: `
            ${User.types}
            type Query {
                ${User.queries}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
        },
    });

    await graphqlServer.start();

    app.use(
        "/graphql",
        expressMiddleware(graphqlServer, {
            context: async ({ req, res }) => ({
                user: req.headers.authorization
                    ? await JWTService.decodeToken(
                        req.headers.authorization.split("Bearer ")[1]
                    )
                    : undefined,
            }),
        })
    );

    return app;
}