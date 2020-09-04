import { UserApi } from '@shared/userApi';
import { NextFunction, Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';

export default class User {
    public path = '/';
    public router = Router();

    private _userApi = new UserApi();

    constructor() {
        this._init();
    }

    private _init() {
        this.router.put(this.path + ':id', this.updateUser.bind(this));
        this.router.delete(this.path + ':id', this.updateUser.bind(this));
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const _user = req.body;
        const { name, description } = _user;
        const user = await this._userApi.updateUser({
            id: req.params.id,
            name,
            description,
        });

        if (user?.errors) next(user.errors);
        else res.status(OK).end();
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const user = await this._userApi.deleteUser({
            id: req.params.id,
        });

        if (user?.errors) next(user.errors);
        else res.status(OK).end();
    }
}
