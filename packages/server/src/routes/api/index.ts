import { Router } from 'express';
import { Socket } from '@connection/socket';
import { default as backgammon } from './backgammon';

export default (io: Socket) => {
    const router = Router();

    router.use('/', backgammon(io));

    return router;
};
