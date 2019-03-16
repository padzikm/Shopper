import {objectType, queryType, makeSchema} from 'nexus'

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

const Product = objectType({
name: 'Product',
definition(t){
    t.string('name')
}
});

const Query = queryType({
    definition(t){
        t.list.field('products', {type: Product, resolve(){ return products;}})
    }
})

export const schema = makeSchema({
    types: [Query, Product],
    outputs: {
        schema: __dirname + "/schema.graphql",
        typegen: __dirname + "/typings.ts"
    }
})

// const cokolwiek =  gql`
//   # Comments in GraphQL are defined with the hash (#) symbol.

//   type Products {
//     name: String
//   }

//   # The "Query" type is the root of all GraphQL queries.
//   # (A "Mutation" type will be covered later on.)
//   type Query {
//     products: [Products]
//   }
// `;