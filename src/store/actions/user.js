import api             from '../../apiSingleton';
import { UPDATE_USER } from '../constants/user';

export function getUser() {
    return async dispatch => {
        const data = await api.user.get();

        dispatch({
            type    : UPDATE_USER,
            payload : { user: { ...data } }
        });
    };
}
