import http from 'http';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import routes from './routes';
import logger from '@shared/Logger';
import { cookieProps } from '@shared/constants';
import { socket } from './connection/socket';

// Init express
const app = express();
const server = http.createServer(app);

/************************************************************************************
 *                              Set socket settings
 ***********************************************************************************/
const io = socket(server);
app.locals.io = io;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/', routes(io));

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

// Export app instance for testing
export { app };
// Export express instance
export default server;
