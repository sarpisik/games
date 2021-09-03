import { Router } from 'express';
import { Socket } from '@connection/socket';
import { default as backgammon } from './backgammon';
import { User } from './user';

export default (io: Socket) => {
    const router = Router();

    router.use('/backgammon', backgammon(io));

    router.use('/users', new User().router);

    return router;
};
