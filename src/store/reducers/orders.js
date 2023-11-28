/* eslint-disable camelcase */
import produce from 'immer';

import {
    UPDATE_DELIVERY_STATUS,
    UPDATE_IS_DELIVERY_LOADING,
    UPDATE_ORDERS
} from '../constants/orders';
import { LOGOUT, UPDATE_SESSION_FAILURE } from '../constants/session';

const initialState = {
    orders            : null,
    isDeliveryStarted : false,
    isDeliveryLoading : true
};

export default produce((draft, action) => {
    const { payload } = action;

    switch (action.type) {
        case UPDATE_ORDERS: {
            draft.orders = payload.orders;
            break;
        }

        case UPDATE_DELIVERY_STATUS: {
            draft.isDeliveryStarted = payload.isDeliveryStarted;
            break;
        }

        case UPDATE_IS_DELIVERY_LOADING: {
            draft.isDeliveryLoading = payload.isDeliveryLoading;

            break;
        }

        case UPDATE_SESSION_FAILURE:
        case LOGOUT: {
            draft.orders = null;
            break;
        }

        default:
            break;
    }
}, initialState);
