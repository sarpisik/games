module.exports = {
    apps: [
        {
            name: 'games',
            script:
                'node -r module-alias/register ./build/server/src --env=production',
        },
    ],
};
