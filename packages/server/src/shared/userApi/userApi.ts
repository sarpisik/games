import awsConfig from '@shared-backgammon/src/aws-exports';
import { User } from '@shared-backgammon/src/types/user';
import { customPromise } from '@shared/customPromise';
import { GraphQLResult } from '@shared-types/user';
import * as graphql from 'graphql';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import Cognito from '@shared/cognito';
import { deleteUser } from './methods';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = fetch;

const { aws_appsync_graphqlEndpoint } = awsConfig;

const { print } = graphql;

const getUser = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            name
            description
            email
            backgammon {
                score
                wins
                loses
                escapes
            }
            createdAt
            updatedAt
            owner
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
            backgammon {
                score
                wins
                loses
                escapes
            }
            createdAt
            updatedAt
            owner
        }
    }
`;

export default class UserApi {
    _endpoint = aws_appsync_graphqlEndpoint;
    _cognito = new Cognito();
    deleteUser = deleteUser;

    async fetchUser(
        id: User['id']
    ): Promise<GraphQLResult<{ getUser: User | null }>> {
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
