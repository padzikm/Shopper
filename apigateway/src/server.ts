const { ApolloServer, gql } = require('apollo-server');
//import bla from './schema.gql'

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// const products = [
//   {
//     name: 'raz'
//   },
//   {
//     name: 'dwaa'
//   },
//   {
//     name: 'trzyy'
//   },
// ];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
 //const typeDefs = bla 


// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
// const resolvers = {
//   Query: {
//     products: () => products,
//   },
// };

import {schema} from './sch'
// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
//export const server = new ApolloServer({ typeDefs, resolvers });
export const server = new ApolloServer({ schema });

