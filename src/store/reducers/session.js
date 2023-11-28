import produce from 'immer';

import {
    CHECK_SESSION_SUCCESS,
    LOGOUT,
    UPDATE_JWT,
    UPDATE_SESSION_FAILURE,
    UPDATE_SESSION_SUCCESS
} from '../constants/session';

const initialState = {
    isUserLoggedIn : false,
    isSessionExist : false,
    jwt            : ''
};

export default produce((draft, action) => {
    const { payload } = action;

    switch (action.type) {
        case CHECK_SESSION_SUCCESS: {
            draft.isSessionExist = true;
            break;
        }

        case UPDATE_SESSION_SUCCESS: {
            draft.isUserLoggedIn = true;
            break;
        }

        case UPDATE_JWT: {
            draft.jwt = payload.jwt;
            break;
        }

        case UPDATE_SESSION_FAILURE:
        case LOGOUT: {
            draft.isUserLoggedIn = false;
            draft.jwt = '';
            draft.isSessionExist = false;
            break;
        }

        default:
            break;
    }
}, initialState);
