type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum LengthUnit {
  Meter = "METER",
  Cent = "CENT"
}

export type Mutation = {
  crProduct?: Maybe<Product>;
};

export type MutationCrProductArgs = {
  unit?: Maybe<LengthUnit>;
};

export type Product = {
  name: Scalars["String"];
  desc?: Maybe<Scalars["String"]>;
};

export type ProductDescArgs = {
  unit?: Maybe<LengthUnit>;
};

export type Query = {
  products: Array<Product>;
};
export type CokolwQueryVariables = {};

export type CokolwQuery = { __typename?: "Query" } & {
  products: Array<{ __typename?: "Product" } & FragFragment>;
};

export type FragFragment = { __typename?: "Product" } & Pick<Product, "name">;

export type Wariabl1QueryVariables = {};

export type Wariabl1Query = { __typename?: "Query" } & {
  products: Array<{ __typename?: "Product" } & Pick<Product, "name" | "desc">>;
};

export type Wariabl2QueryVariables = {
  unit?: Maybe<LengthUnit>;
};

export type Wariabl2Query = { __typename?: "Query" } & {
  products: Array<{ __typename?: "Product" } & Pick<Product, "desc">>;
};

export type CreateProductMutationVariables = {
  unit?: Maybe<LengthUnit>;
};

export type CreateProductMutation = { __typename?: "Mutation" } & {
  crProduct: Maybe<{ __typename?: "Product" } & Pick<Product, "name">>;
};
