const { ApolloServer, gql } = require('apollo-server');

import {resolvers} from './resolvers'
import typeDefs from './schema.graphql'
//import { makeExecutableSchema } from 'graphql-tools'

const apolloResolvers = resolvers as any;

//var schema = makeExecutableSchema({typeDefs, resolvers: apolloResolvers})
// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
export const server = new ApolloServer({ typeDefs, resolvers });
//export const server = new ApolloServer({ schema });
//export const server = new ApolloServer(typeDefs, resolvers);

