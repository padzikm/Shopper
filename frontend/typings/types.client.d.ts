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
export type CokolwQueryVariables = {};

export type CokolwQuery = { __typename?: "Query" } & {
  products: Array<{ __typename?: "Product" } & FragFragment>;
};

export type FragFragment = { __typename?: "Product" } & Pick<Product, "name">;

export type TestmutMutationVariables = {
  prod: ProductInput;
};

export type TestmutMutation = { __typename?: "Mutation" } & {
  createProduct: { __typename?: "Product" } & Pick<Product, "name" | "desc">;
};
