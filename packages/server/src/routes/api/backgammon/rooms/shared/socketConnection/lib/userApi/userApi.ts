import awsConfig from '@shared-backgammon/src/aws-exports';
import { User } from '@shared-backgammon/src/types/user';
import { customPromise } from '@shared/customPromise';
import * as graphql from 'graphql';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import Cognito from '@shared/cognito';

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

export default class UserApi {
    private _endpoint = aws_appsync_graphqlEndpoint;
    private _cognito = new Cognito();

    async fetchUser(
        id: User['id']
    ): Promise<{ data?: { getUser?: User | null } }> {
        const _body = { query: print(getUser), variables: { id } };
        const body = await customPromise(() => JSON.stringify(_body));
        const headers = {
            // 'x-api-key': this._apiKey,
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
