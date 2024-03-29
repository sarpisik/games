/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  email: string,
  backgammon: GameInput,
};

export type GameInput = {
  score: number,
  wins: number,
  loses: number,
  escapes: number,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  email?: string | null,
  backgammon?: GameInput | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      description: string | null,
      email: string,
      backgammon:  {
        __typename: "Game",
        score: number,
        wins: number,
        loses: number,
        escapes: number,
      },
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string | null,
    email: string,
    backgammon:  {
      __typename: "Game",
      score: number,
      wins: number,
      loses: number,
      escapes: number,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
