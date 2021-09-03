import { BrokenPointProps } from '../../../../shared/types';

export default function filterBrokenPoint(
    tested: false | BrokenPointProps
): tested is BrokenPointProps {
    return Boolean(tested);
}
