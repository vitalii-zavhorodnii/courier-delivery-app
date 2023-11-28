import produce from 'immer';

import { DISMISS_MESSAGE, SHOW_MESSAGE } from '../constants/snackBar';

const initialState = {
    message : ''
};

export default produce((draft, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_MESSAGE:
            draft.message = payload.message;
            break;
        case DISMISS_MESSAGE:
            draft.message = '';
            break;

        default:
            break;
    }
}, initialState);
