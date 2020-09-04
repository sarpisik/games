import { GetUserQuery, GameInput } from '../API';

export type User = Omit<
    Exclude<GetUserQuery['getUser'], null>,
    '__typename' | 'backgammon'
> & {
    backgammon: GameInput;
};
