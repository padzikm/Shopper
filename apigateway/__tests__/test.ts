import { createTestClient } from 'apollo-server-testing';
import { server } from '../src/server';
import { gql } from 'apollo-server-core';
import { GraphQLResponse } from 'graphql-extensions';

test('create test client', () => {
    const { query, mutate } = createTestClient(server);

    expect(query).toBeDefined()
    expect(mutate).toBeDefined()
});

test('query schema test', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query {
        __schema{
            types {
                name
            }
        }
    }`

    let res = await query({query: queryGql})
    
    expect(res.data).toMatchSnapshot()
});

test('query products test', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query {
        products {
            name
        }
    }`

    let res = await query({query: queryGql})
    
    expect(res.data).toMatchSnapshot()
});

test('query products desc test', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query {
        products {
            desc
        }
    }`

    let res = await query({query: queryGql})
    
    expect(res.data).toMatchSnapshot()
});

test('aliases', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query {
        products {
            alias1: desc(unit: CENT)
            alias2: desc
        }
    }`

    let res = await query({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('operation name', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname{
        products {
            alias1: desc(unit: CENT)
            alias2: desc
        }
    }`
    let res = await query({query: queryGql})
    
    expect(res.data).toMatchSnapshot()
})

test('fragments', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname{
        productOne: products {
            ...frag
        }
        productTwo: products {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: METER)
    }`
    let queryGood = query as (args: any) => any
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('fragments variables', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname($u: LengthUnit){
        productOne: products {
            ...frag
        }
        productTwo: products {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: $u)
    }`
    let queryGood = query as (args: any) => any
    let res = await queryGood({query: queryGql, variables: {'u': 'CENT'}})

    expect(res.data).toMatchSnapshot()
})

test('fragments mandatory variables', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname($u: LengthUnit!){
        productOne: products {
            ...frag
        }
        productTwo: products {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: $u)
    }`
    let queryGood = query as (args: any) => any
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('fragments default variables', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname($u: LengthUnit = CENT){
        productOne: products {
            ...frag
        }
        productTwo: products {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: $u)
    }`
    let queryGood = query as (args: any) => any
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('if directive', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname($u: LengthUnit = CENT){
        productOne: products @include(if: false) {
            ...frag
        }
        productTwo: products {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: $u)
    }`
    let queryGood = query as (args: any) => any
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('skip directive', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname($u: LengthUnit = CENT){
        productOne: products @skip(if: true) {
            ...frag
        }
        productTwo: products {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: $u)
    }`
    let queryGood = query as (args: any) => any
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('mutation', async () => {
    const { mutate } = createTestClient(server);

    const mutationGql = gql`mutation opname($u: LengthUnit = CENT){
        crProduct(unit: $u) {
            name
            desc
        }
    }`
    let mutationGood = mutate as (args: any) => any
    let res = await mutationGood({mutation: mutationGql})

    expect(res.data).toMatchSnapshot()
})

test('mutation fragments', async () => {
    const { mutate } = createTestClient(server);

    const mutationGql = gql`mutation opname($u: LengthUnit = CENT){
        productOne: crProduct(unit: $u) {
            ...frag
        }
        productTwo: crProduct {
            ...frag
        }
    }
    fragment frag on Product {
            name
            desc(unit: $u)
    }`
    let mutationGood = mutate as (args: any) => any
    let res = await mutationGood({mutation: mutationGql})

    expect(res.data).toMatchSnapshot()
})

test('mutation input', async () => {
    const { mutate } = createTestClient(server);

    const mutationGql = gql`mutation opname($product: ProductInput!){
        createProduct(product: $product){
            name
            desc
        }
    }`
    let mutationGood = mutate as (args: unknown) => Promise<GraphQLResponse>
    let res = await mutationGood({mutation: mutationGql, variables: {product: {name: 'costam bla'}}})
    
    expect(res.data).toMatchSnapshot()
})

test('interfejs', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname{
        interfejs{
            name
            ... on Jakistam{
                pole
            }
        }
    }`
    let queryGood = query as (args: any) => Promise<GraphQLResponse>
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})

test('unia', async () => {
    const { query } = createTestClient(server);

    const queryGql = gql`query opname{
        unia{
            __typename
            ... on Testowy{
                name
            }
            ... on Jakistam {
                pole
            }
            ... on Cokolwiek{
                x
                y
            }
        }
    }`
    let queryGood = query as (args: any) => Promise<GraphQLResponse>
    let res = await queryGood({query: queryGql})

    expect(res.data).toMatchSnapshot()
})