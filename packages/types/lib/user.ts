export interface GraphQLResult<T = object> {
    data?: T;
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}