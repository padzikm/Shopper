import { Query, Product, IResolvers, QueryResolvers, ProductResolvers, MutationResolvers, LengthUnit, Testowy, Jakistam, JakistamResolvers, TestowyResolvers, UniaResolvers, Unia, CokolwiekResolvers } from "../typings/types.server";


let products = [
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
    products: (p, a, c, info) => {
      return products
    },
    interfejs: () => {
      let t: Jakistam = {name: 'bla', pole: 5}
      return t;
     },
     unia: () => {
       let t: Unia = {desc: 'bla2', x: 3, y: 'adaaa'}
       return t;
     }
}

const Mutation: MutationResolvers = {
  crProduct: (parent, args) => {
    let product: Product = {
      name: 'mutation ' + (args.unit ? args.unit : 'bla'),
    }
    products.push(product)
    return product;
  },

  createProduct: (parent, args) => {
    products.push(args.product);
    return args.product;
  }
}

const Jakistam: JakistamResolvers = {
  name: () => 'bla jakistam',
  pole: () => 6
}

const Testowy: TestowyResolvers = {
  __resolveType: () => "Jakistam"
}

const Unia: UniaResolvers = {
  __resolveType: () => "Cokolwiek"
}

const Product: ProductResolvers = {
    name: (parent) => parent.name,
    desc: (parent, args, ctx, info) => {
      return args.unit ? 'jest opis' : 'nie ma opisu'
    }
}

const Cokolwiek: CokolwiekResolvers = {
  x: () => 4,
  y: () => "afdafas;flk"
}

export const resolvers: IResolvers = {
    Query,
    Mutation,
    Product,
    Jakistam,
    Testowy,
    Unia,
    Cokolwiek
}