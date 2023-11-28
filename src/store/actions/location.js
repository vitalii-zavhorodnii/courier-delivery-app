import api from '../../apiSingleton';
import { UPDATE_LOCATION_PERMISSION } from '../constants/location';
import { updateDeliveryStatus } from './orders';

export function updateLocationPermission(status) {
    return async dispatch => {
        dispatch({
            type    : UPDATE_LOCATION_PERMISSION,
            payload : { status }
        });
    };
}

export function sendCoordinates(coordinates) {
    return async dispatch => {
        await api.location.sendCoordinates(coordinates);

        dispatch(updateDeliveryStatus());
    };
}
