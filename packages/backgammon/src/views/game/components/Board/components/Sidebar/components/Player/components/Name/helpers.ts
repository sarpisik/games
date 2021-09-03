import { Round } from 'types/lib/backgammon';

export function getCurrentRound(rounds: Round[]) {
    return rounds[rounds.length - 1];
}

export function checkIsRoundPlayer(player: Round['player'], round: Round) {
    return player === round?.player;
}

export function setFontColor(isRoundPlayer: boolean) {
    return isRoundPlayer ? 'yellow' : '#ffffff';
}
