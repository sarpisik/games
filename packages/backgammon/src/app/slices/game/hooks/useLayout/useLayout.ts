import { useRound } from '../useRound';

export default function useLayout() {
    const round = useRound();

    return round?.layout || [];
}
