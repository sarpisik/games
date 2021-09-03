import { GameInput, GetUserQuery } from "../../backgammon/src/API";

export type User = Omit<
    Exclude<GetUserQuery["getUser"], null>,
    "__typename" | "backgammon"
> & {
    backgammon: GameInput;
};

export interface GraphQLResult<T = object> {
    data?: T;
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}
