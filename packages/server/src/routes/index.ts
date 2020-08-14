import { Router } from 'express';

import { default as apiRoutes } from './api';
import { OK } from 'http-status-codes';

export default (io: SocketIO.Server) => {
    const router = Router();

    router.use('/', (_, res) => {
        res.status(OK).json({ message: 'Server is running' });
    });

    router.use('/api', apiRoutes(io));

    return router;
};

// import { Router } from 'express';
// import UserRouter from './Users';
// import AuthRouter from './Auth';

// // Init router and path
// const router = Router();

// // Add sub-routes
// router.use('/users', UserRouter);
// router.use('/auth', AuthRouter);

// // Export the base-router
// export default router;
