export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
  products: Product[];
}

export interface Product {
  name: string;
}

// ====================================================
// Arguments
// ====================================================
