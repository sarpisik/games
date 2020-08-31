import { User } from '@shared-backgammon/src/types/user';
import gql from 'graphql-tag';
import * as graphql from 'graphql';
import fetch from 'node-fetch';
import awsConfig from '@shared-backgammon/src/aws-exports';
const { aws_appsync_graphqlEndpoint, aws_appsync_apiKey } = awsConfig;

const { print } = graphql;

const getUser = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            name
            email
            wins
            loses
            escapes
        }
    }
`;

export function fetchUser(id: User['id']) {
    const body = { query: print(getUser), variables: { id } };
    return fetch(aws_appsync_graphqlEndpoint, {
        method: 'post',
        headers: {
            'x-api-key': aws_appsync_apiKey,
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
}

export function validateUser(user: User | null): user is User {
    return Boolean(user);
}
