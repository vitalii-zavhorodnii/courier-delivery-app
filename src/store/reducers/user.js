import produce from 'immer';

import { LOGOUT } from '../constants/session';
import { UPDATE_USER } from '../constants/user';

const initialState = {
    user : null
};

export default produce((draft, action) => {
    const { payload } = action;

    switch (action.type) {
        case UPDATE_USER: {
            draft.user = payload.user;
            break;
        }

        case LOGOUT: {
            draft.user = null;
            break;
        }

        default:
            break;
    }
}, initialState);
