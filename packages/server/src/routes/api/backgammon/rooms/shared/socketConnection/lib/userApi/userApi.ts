import awsConfig from '@shared-backgammon/src/aws-exports';
import { User } from '@shared-backgammon/src/types/user';
import { customPromise } from '@shared/customPromise';
import * as graphql from 'graphql';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

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
    private _endpoint: string;

    constructor(
        params = {
            endpoint: aws_appsync_graphqlEndpoint,
        }
    ) {
        this._endpoint = params.endpoint;
    }

    async fetchUser(
        id: User['id']
    ): Promise<{ data?: { getUser?: User | null } }> {
        const _body = { query: print(getUser), variables: { id } };
        const body = await customPromise(() => JSON.stringify(_body));

        return fetch(this._endpoint, {
            method: 'post',
            body,
        }).then((res) => {
            const parsedRes = res.json();
            return parsedRes;
        });
    }

    validateUser(user?: User | null): user is User {
        return Boolean(user);
    }
}
