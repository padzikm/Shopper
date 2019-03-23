type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cokolwiek = {
  y: Scalars["ID"];
  x?: Maybe<Scalars["Float"]>;
};

export type Jakistam = Testowy & {
  name: Scalars["String"];
  pole?: Maybe<Scalars["Int"]>;
};

export enum LengthUnit {
  Meter = "METER",
  Cent = "CENT"
}

export type Mutation = {
  crProduct?: Maybe<Product>;
  createProduct: Product;
};

export type MutationCrProductArgs = {
  unit?: Maybe<LengthUnit>;
};

export type MutationCreateProductArgs = {
  product: ProductInput;
};

export type Product = Testowy & {
  name: Scalars["String"];
  desc?: Maybe<Scalars["String"]>;
};

export type ProductDescArgs = {
  unit?: Maybe<LengthUnit>;
};

export type ProductInput = {
  name: Scalars["String"];
};

export type Query = {
  products: Array<Product>;
  unia?: Maybe<Unia>;
  interfejs?: Maybe<Testowy>;
};

export type Testowy = {
  name: Scalars["String"];
};

export type Unia = Product | Jakistam | Cokolwiek;

import { GraphQLResolveInfo } from "graphql";

export type ArrayOrIterable<T> = Array<T> | Iterable<T>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface ISubscriptionResolverObject<
  TResult,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | ISubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export type CokolwiekResolvers<Context = any, ParentType = Cokolwiek> = {
  y?: Resolver<Scalars["ID"], ParentType, Context>;
  x?: Resolver<Maybe<Scalars["Float"]>, ParentType, Context>;
};

export type JakistamResolvers<Context = any, ParentType = Jakistam> = {
  name?: Resolver<Scalars["String"], ParentType, Context>;
  pole?: Resolver<Maybe<Scalars["Int"]>, ParentType, Context>;
};

export type MutationResolvers<Context = any, ParentType = Mutation> = {
  crProduct?: Resolver<
    Maybe<Product>,
    ParentType,
    Context,
    MutationCrProductArgs
  >;
  createProduct?: Resolver<
    Product,
    ParentType,
    Context,
    MutationCreateProductArgs
  >;
};

export type ProductResolvers<Context = any, ParentType = Product> = {
  name?: Resolver<Scalars["String"], ParentType, Context>;
  desc?: Resolver<
    Maybe<Scalars["String"]>,
    ParentType,
    Context,
    ProductDescArgs
  >;
};

export type QueryResolvers<Context = any, ParentType = Query> = {
  products?: Resolver<ArrayOrIterable<Product>, ParentType, Context>;
  unia?: Resolver<Maybe<Unia>, ParentType, Context>;
  interfejs?: Resolver<Maybe<Testowy>, ParentType, Context>;
};

export type TestowyResolvers<Context = any, ParentType = Testowy> = {
  __resolveType: TypeResolveFn<"Product" | "Jakistam", ParentType, Context>;
  name?: Resolver<Scalars["String"], ParentType, Context>;
};

export type UniaResolvers<Context = any, ParentType = Unia> = {
  __resolveType: TypeResolveFn<
    "Product" | "Jakistam" | "Cokolwiek",
    ParentType,
    Context
  >;
};

export type IResolvers<Context = any> = {
  Cokolwiek?: CokolwiekResolvers<Context>;
  Jakistam?: JakistamResolvers<Context>;
  Mutation?: MutationResolvers<Context>;
  Product?: ProductResolvers<Context>;
  Query?: QueryResolvers<Context>;
  Testowy?: TestowyResolvers;
  Unia?: UniaResolvers;
};
