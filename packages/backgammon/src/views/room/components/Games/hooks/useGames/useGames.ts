import { ComponentProps } from 'react';
import { useRoom } from '../../../../../../app/slices';
import { Game } from '../../components';

type GameProps = ComponentProps<typeof Game>;
type Room = ReturnType<typeof useRoom>;
type G = Room['games'][number];
type rtn = (G & {
    players: GameProps['players'];
})[];

export default function useGames(urlPrefix: string) {
    const room = useRoom();
    const { games } = room;
    const gamesProps: GameProps[] = games.map((game) =>
        Object.assign({}, game, {
            url: `${urlPrefix}/${game.id.toString()}`,
            children: `Game ${game.id}`,
        })
    );

    return gamesProps;
}
