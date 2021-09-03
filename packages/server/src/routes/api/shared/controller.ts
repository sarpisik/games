import { Router } from 'express';

export type RouterType = typeof Router;

export class Controller {
    router: Router;

    constructor(router: RouterType, public path: string) {
        this.router = router();
    }
}
