import { User } from '@shared-backgammon/src/types/user';
import gql from 'graphql-tag';
import * as graphql from 'graphql';
import fetch from 'node-fetch';

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

export function fetchUser(userId: User['id']) {
    const body = { query: print(getUser), variables: { id: userId } };
    return fetch(process.env.AWS_GRAPHQL_USERS_API_ENDPOINT as string, {
        method: 'post',
        headers: {
            'x-api-key': process.env.AWS_GRAPHQL_USERS_API_KEY as string,
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
}

export function validateUser(user: User | null): user is User {
    return Boolean(user);
}
