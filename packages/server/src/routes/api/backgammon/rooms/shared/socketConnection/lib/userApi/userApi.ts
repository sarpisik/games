import awsConfig from '@shared-backgammon/src/aws-exports';
import { User } from '@shared-backgammon/src/types/user';
import { customPromise } from '@shared/customPromise';
import * as graphql from 'graphql';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

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

export default class UserApi {
    private _endpoint: string;
    private _apiKey: string;

    constructor(
        params = {
            endpoint: aws_appsync_graphqlEndpoint,
            apiKey: aws_appsync_apiKey,
        }
    ) {
        this._endpoint = params.endpoint;
        this._apiKey = params.apiKey;
    }

    async fetchUser(
        id: User['id']
    ): Promise<{ data?: { getUser?: User | null } }> {
        const _body = { query: print(getUser), variables: { id } };
        const body = await customPromise(() => JSON.stringify(_body));

        return fetch(this._endpoint, {
            method: 'post',
            headers: {
                'x-api-key': this._apiKey,
            },
            body,
        }).then((res) => res.json());
    }

    validateUser(user?: User | null): user is User {
        return Boolean(user);
    }
}
