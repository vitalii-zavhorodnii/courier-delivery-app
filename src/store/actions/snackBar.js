import { DISMISS_MESSAGE, SHOW_MESSAGE } from '../constants/snackBar';

export function showMessage(payload) {
    return {
        type : SHOW_MESSAGE,
        payload
    };
}

export function dismissMessage() {
    return {
        type : DISMISS_MESSAGE
    };
}
