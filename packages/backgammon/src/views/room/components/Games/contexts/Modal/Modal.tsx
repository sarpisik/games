import React from 'react';
import { GameClient } from 'types/lib/backgammon';

interface ContextProps {
    readonly open: boolean;
    readonly gameId: GameClient['id'];
    readonly setOpen: (gameId: GameClient['id']) => (open: boolean) => void;
    readonly setClose: () => void;
}

export const ModalContext = React.createContext<ContextProps>({
    gameId: -1,
    open: false,
    setOpen() {
        return () => null;
    },
    setClose() {
        return null;
    },
});

interface ModalProviderProps {
    children: React.ReactNode;
}
export function ModalProvider(props: ModalProviderProps): React.ReactElement {
    const [open, _setOpen] = React.useState(true);
    const [gameId, setGameId] = React.useState(-1);

    const setOpen: ContextProps['setOpen'] = () => () => {
        setGameId(gameId);
        _setOpen(true);
    };
    const setClose = () => {
        _setOpen(false);
        setGameId(-1);
    };

    return (
        <ModalContext.Provider
            value={{ gameId, open, setClose, setOpen }}
            {...props}
        />
    );
}
