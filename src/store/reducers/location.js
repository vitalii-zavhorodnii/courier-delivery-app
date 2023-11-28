import produce from 'immer';
import { RESULTS } from 'react-native-permissions';

import { UPDATE_LOCATION_PERMISSION } from '../constants/location';

const initialState = {
    locationPermissionStatus : 'blocked',
    isPermissionGranted      : false
};

export default produce((draft, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_LOCATION_PERMISSION:
            draft.locationPermissionStatus = payload.status;
            draft.isPermissionGranted = payload.status === RESULTS.GRANTED;
            break;
        default:
            break;
    }
}, initialState);
