enum COMMANDS {
    BREAK = 'BREAK',
    CONTINUE = 'CONTINUE',
}

export default function customPromiseLoop(
    limit: Params['limit'],
    cb: Params['cb']
) {
    return new Promise((resolve, reject) => {
        recursivelyCustomPromiseLoop({ limit, cb, resolve }).catch(reject);
    });
}

interface Params {
    limit: number;
    cb: (i: number, commands: typeof COMMANDS) => COMMANDS;
    resolve: () => void;
    i?: number;
}

async function recursivelyCustomPromiseLoop(params: Params) {
    const { limit, cb, resolve, i = 0 } = params;

    if (i >= limit) {
        resolve();
    } else {
        const response = cb(i, COMMANDS);
        if (response === COMMANDS.BREAK) {
            resolve();
        } else if (response === COMMANDS.CONTINUE) {
            params.i = i + 1;
            setImmediate(() => {
                recursivelyCustomPromiseLoop(params);
            });
        } else {
            throw new Error('Invalid command type: ' + response);
        }
    }
}
