import { Round } from '../../round';

export default function checkCollectedExist(
    tested?: Round['collected']
): tested is Round['collected'] {
    return typeof tested !== undefined;
}
