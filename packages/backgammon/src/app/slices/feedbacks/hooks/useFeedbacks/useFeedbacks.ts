import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Feedbacks } from '../../feedbacks';

export default function useFeedbacks(key: keyof Feedbacks) {
    const feedback = useSelector(selectBy(key));

    return feedback;
}

function selectBy(key: keyof Feedbacks) {
    return function selector(state: RootState) {
        return state.feedbacks[key];
    };
}
