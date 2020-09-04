import awsConfig from '@shared-backgammon/src/aws-exports';
import { User } from '@shared-backgammon/src/types/user';
import { customPromise } from '@shared/customPromise';
import { GraphQLResult } from '@shared-types/user';
import * as graphql from 'graphql';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import Cognito from '@shared/cognito';
import { deleteUser } from './methods';

const { aws_appsync_graphqlEndpoint } = awsConfig;

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
const updateUser = gql`
    mutation UpdateUser(
        $input: UpdateUserInput!
        $condition: ModelUserConditionInput
    ) {
        updateUser(input: $input, condition: $condition) {
            id
            name
            description
            email
            wins
            loses
            escapes
            createdAt
            updatedAt
        }
    }
`;

export default class UserApi {
    _endpoint = aws_appsync_graphqlEndpoint;
    _cognito = new Cognito();
    deleteUser = deleteUser;

    async fetchUser(
        id: User['id']
    ): Promise<{ data?: { getUser?: User | null } }> {
        const _body = { query: print(getUser), variables: { id } };
        const body = await customPromise(() => JSON.stringify(_body));
        const headers = {
            authorization: this._cognito.accessToken,
        };

        return fetch(this._endpoint, {
            method: 'post',
            headers,
            body,
        }).then((res) => res.json());
    }

    async updateUser(
        input: Partial<User>
    ): Promise<GraphQLResult<{ updateUser: User | null }>> {
        const _body = { query: print(updateUser), variables: { input } };
        const body = await customPromise(() => JSON.stringify(_body));
        const headers = {
            authorization: this._cognito.accessToken,
        };

        return fetch(this._endpoint, {
            method: 'post',
            headers,
            body,
        }).then((res) => res.json());
    }

    validateUser(user?: User | null): user is User {
        return Boolean(user);
    }
}
