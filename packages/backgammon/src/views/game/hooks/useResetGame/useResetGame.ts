import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../../../app/slices';
import { editGame, initialState } from '../../../../app/slices/game/game';

export default function useResetGame() {
    const dispatch = useDispatch();

    useEffect(
        function resetGameStoreOnUnMount() {
            return () => {
                dispatch(editGame(initialState));
                dispatch(setNotification({ type: '', message: '' }));
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
}
