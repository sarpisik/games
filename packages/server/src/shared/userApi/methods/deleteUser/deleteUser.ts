import { User as U } from '@shared-backgammon/src/types/user';
import { customPromise } from '@shared/customPromise';
import { UserApi } from '@shared/userApi';
import * as graphql from 'graphql';
import gql from 'graphql-tag';

const { print } = graphql;

const q = gql`
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

export default async function deleteUser(this: UserApi, input: Pick<U, 'id'>) {
    const _body = { query: print(q), variables: { input } };
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
