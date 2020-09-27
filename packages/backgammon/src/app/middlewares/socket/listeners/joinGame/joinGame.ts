import { GAME_EVENTS } from 'types/lib/game';
import { setConnectionStatus } from '../../../../slices';
import { CONNECTION_STATUS } from '../../../../slices/connection/connection';
import { withNotification, withSocketConnection } from '../../utils';
import {
    onChatMessage,
    onGameOver,
    onJoinGame,
    onPlayerDisconnect,
    onReplaceRound,
    onRound,
    onShortTimer,
    onSkipRound,
    onStageOver,
    onSurrender,
    onTimer,
    onUndoRound,
    onUserDisconnect,
    onUserNotFoundChat,
} from './handlers';

export default withSocketConnection(function joinGame(connection, store) {
    store.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTING));
    connection.on(
        'disconnect',
        withNotification(GAME_EVENTS.DISCONNECT_FROM_SERVER)(store)
    );
    connection.on(GAME_EVENTS.JOIN_GAME, onJoinGame(store));
    connection.on(GAME_EVENTS.DISCONNECT_PLAYER, onPlayerDisconnect(store));
    connection.on(GAME_EVENTS.DISCONNECT_USER, onUserDisconnect(store));
    connection.on(
        GAME_EVENTS.ERROR,
        withNotification(GAME_EVENTS.ERROR)(store)
    );
    connection.on(GAME_EVENTS.TIMER, onTimer(store));
    connection.on(GAME_EVENTS.SHORT_TIMER, onShortTimer(store));
    connection.on(GAME_EVENTS.ROUND, onRound(store));
    connection.on(
        GAME_EVENTS.STAGE_OVER,
        withNotification(GAME_EVENTS.STAGE_OVER, onStageOver)(store)
    );
    connection.on(
        GAME_EVENTS.SKIP_ROUND,
        withNotification(GAME_EVENTS.SKIP_ROUND, onSkipRound)(store)
    );
    connection.on(GAME_EVENTS.REPLACE_ROUND, onReplaceRound(store));
    connection.on(GAME_EVENTS.UNDO_ROUND, onUndoRound(store));
    connection.on(GAME_EVENTS.SURRENDER, onSurrender(store));
    connection.on(
        GAME_EVENTS.GAME_OVER,
        withNotification(GAME_EVENTS.GAME_OVER, onGameOver)(store)
    );
    connection.on(GAME_EVENTS.USER_NOT_FOUND_CHAT, onUserNotFoundChat(store));
    connection.on(GAME_EVENTS.MESSAGE, onChatMessage(store));
    connection.on(
        GAME_EVENTS.NOTIFICATION,
        withNotification(GAME_EVENTS.NOTIFICATION)(store)
    );
});
