import { ComponentProps } from 'react';
import { Game } from '../../components';
import { useRoom } from '../../../../../../app/slices';
import { User, PLAYERS } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';

type GameProps = ComponentProps<typeof Game>;
type Room = ReturnType<typeof useRoom>;
type G = Room['games'][number];
type rtn = (G & {
    players: GameProps['players'];
})[];

export default function useGames(urlPrefix: string) {
    const room = useRoom();
    const { games, users } = room;

    const _games = users.reduce(denormalizeUser, games) as rtn;
    const gamesProps: GameProps[] = _games.map((game) =>
        Object.assign({}, game, {
            url: `${urlPrefix}/${game.id.toString()}`,
            children: `Game ${game.id}`,
        })
    );

    return gamesProps;
}

function denormalizeUser(games: Room['games'], user: User): rtn {
    const { id, name } = user;

    return games.map((game) => {
        const players: GameProps['players'] = generatePlayers(null, null);

        if (game.players[PLAYERS.BLACK].id === id)
            players[PLAYERS.BLACK] = name;
        else if (game.players[PLAYERS.WHITE].id === id)
            players[PLAYERS.WHITE] = name;

        return Object.assign({}, game, { players });
    });
}
