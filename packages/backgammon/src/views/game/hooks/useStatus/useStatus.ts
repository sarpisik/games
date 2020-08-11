import { useState } from 'react';
import { STATUS } from '../../constants/status';

export default function useStatus() {
    const [status, setStatus] = useState<STATUS>(STATUS.FETCHING);

    const setStatusFetched = () => {
        setStatus(STATUS.FETCHED);
    };

    const setStatusWhitePlayer = () => {
        setStatus(STATUS.WHITE_PLAYER);
    };

    const setStatusBlackPlayer = () => {
        setStatus(STATUS.BLACK_PLAYER);
    };

    return {
        setStatusBlackPlayer,
        setStatusFetched,
        setStatusWhitePlayer,
        status,
    };
}
