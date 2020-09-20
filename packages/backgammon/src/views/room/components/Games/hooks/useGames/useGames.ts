import { ComponentProps } from 'react';
import { OPPONENT, PLAYERS } from 'types/lib/backgammon';
import { useRoom, useUser } from '../../../../../../app/slices';
import { Game as GameComponent } from '../../components';
import { BodyProps } from '../../components/Game/components/Body';
import { useTranslation } from 'react-i18next';

type GameProps = ComponentProps<typeof GameComponent>;

const PLAYERS_MAP = [PLAYERS.BLACK, PLAYERS.WHITE] as const;

export default function useGames(urlPrefix: string): GameProps[] {
    const { t } = useTranslation();
    const localizedGame = t('game');

    const { user } = useUser();

    const room = useRoom();
    const { games } = room;

    const gamesProps: GameProps[] = games.map((game) => {
        let userTable = false,
            // @ts-ignore
            players: BodyProps['players'] = JSON.parse(
                JSON.stringify(game.players)
            );

        PLAYERS_MAP.forEach((index) => {
            const player = players[index];
            if (player?.id === user.id) {
                userTable = true;
                // @ts-ignore
                players[OPPONENT[index]] = {
                    ...players[OPPONENT[index]],
                    disabled: true,
                };
            }
        });

        return {
            headerProps: {
                gameId: game.id,
                url: `${urlPrefix}/${game.id.toString()}`,
                title: `${localizedGame} ${game.id}`,
                settingsDisabled: userTable,
            },
            bodyProps: {
                gameId: game.id,
                players,
                score: game.score,
                stages: game.stages,
                disabled: userTable,
            },
        };
    });

    return gamesProps;
}
