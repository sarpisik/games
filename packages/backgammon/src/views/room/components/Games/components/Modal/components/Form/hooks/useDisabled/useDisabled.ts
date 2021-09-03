import { useFeedbacks } from '../../../../../../../../../../app/slices';
import { FEEDBACK_STATUS } from '../../../../../../../../../../app/slices/feedbacks/feedbacks';

export default function useDisabled() {
    const feedback = useFeedbacks('editRoomGame');
    const disabled = feedback.status === FEEDBACK_STATUS.FETCHING;

    return disabled;
}
