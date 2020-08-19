import './LoadEnv'; // Must be the first import

import app from '@server';
import logger from '@shared/Logger';

/*
 * TODO:
 * - [] create surrender event.
 * - [] handle quit room event.
 * - [] restart game event.
 * - [] programmatically remove finished game.
 * - [] set round timer.
 */

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
