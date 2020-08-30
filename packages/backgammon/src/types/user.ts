import { GetUserQuery } from '../API';

export type User = Omit<Exclude<GetUserQuery['getUser'], null>, '__typename'>;
