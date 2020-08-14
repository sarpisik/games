import { Router } from 'express';
import { Socket } from '@connection/socket';
import { GamesController, GamesService } from './games';

export default (socket: Socket) => {
    const router = Router();

    [new GamesController(socket, Router, new GamesService(new Map()))].forEach(
        (route) => {
            router.use('/backgammon', route.router);
        }
    );

    return router;
};
