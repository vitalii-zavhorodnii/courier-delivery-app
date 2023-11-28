/* eslint-disable camelcase */
import api from '../../apiSingleton';
import { CHECK_SESSION_SUCCESS,
    LOGOUT,
    UPDATE_JWT,
    UPDATE_SESSION_FAILURE,
    UPDATE_SESSION_SUCCESS }  from '../constants/session';
import Storage from '../../utils/AsyncStorage';
import TrackingManager from '../../utils/TrackingManager';
import { getUser }  from './user';

export function login({ phone, password, onSuccess, onError }) {
    return async dispatch => {
        const { access_token } = await api.session.create({ phone, password });
        const isResponseValid = !!access_token;

        if (isResponseValid) {
            await Storage.setItem('jwt', access_token);
            await dispatch(checkSession());
            onSuccess();
        } else {
            onError();
        }
    };
}

export function logout() {
    return async dispatch => {
        api.apiClient.setToken('');

        await Storage.clear();
        await dispatch({ type: LOGOUT });
        await dispatch(checkSession());
    };
}

export function checkSession() {
    return async dispatch => {
        const jwt = await Storage.getItem('jwt');

        if (jwt) {
            api.apiClient.setToken(jwt);

            await dispatch(getUser());

            await dispatch({
                type    : UPDATE_JWT,
                payload : { jwt }
            });

            await dispatch({ type: UPDATE_SESSION_SUCCESS });
            TrackingManager.initialize();
        } else {
            dispatch({ type: UPDATE_SESSION_FAILURE });
        }

        dispatch({ type: CHECK_SESSION_SUCCESS });
    };
}
