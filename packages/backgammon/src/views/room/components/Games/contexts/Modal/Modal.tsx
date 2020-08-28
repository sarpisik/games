import React from 'react';

interface ContextProps {
    readonly open: boolean;
    readonly setOpen: (open: boolean) => void;
}

export const ModalContext = React.createContext<ContextProps>({
    open: false,
    setOpen() {
        return null;
    },
});

interface ModalProviderProps {
    children: React.ReactNode;
}
export function ModalProvider(props: ModalProviderProps): React.ReactElement {
    const [open, setOpen] = React.useState(false);

    return <ModalContext.Provider value={{ open, setOpen }} {...props} />;
}
