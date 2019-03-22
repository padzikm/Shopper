import { Query, Product, IResolvers, QueryResolvers, ProductResolvers, MutationResolvers } from "../typings/types.server";


const products = [
    {
      name: 'raz'
    },
    {
      name: 'dwaa'
    },
    {
      name: 'trzyy'
    },
  ];

const Query: QueryResolvers = {
    products: () => products
}

const Mutation: MutationResolvers = {

}

const Product: ProductResolvers = {
    name: (parent) => parent.name,
    desc: (parent, args) => args.unit ? 'jest opis' : 'nie ma opisu'
}

export const resolvers: IResolvers = {
    Query,
    Mutation,
    Product
}