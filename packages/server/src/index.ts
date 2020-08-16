require('module-alias/register');
import './LoadEnv'; // Must be the first import

import app from '@server';
import logger from '@shared/Logger';

/*
 * TODO:
 * - [] remove finished game.
 * - [] programmatically remove finished game.
 */

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
