import { createTestClient } from 'apollo-server-testing';
import { server } from '../src/server';
import { gql } from 'apollo-server-core';

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