import React from 'react';
import { usePlayer } from './hooks';

export default function withGamePlayer<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithGamePlayer(props: Props) {
        const { gamePlayer } = usePlayer();

        return gamePlayer ? <WrappedComponent {...props} /> : null;
    };
}
