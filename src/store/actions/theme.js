import { INITIALIZED_THEME_MODE, UPDATE_THEME_VALUE } from '../constants/theme';

export function updateThemeValue(mode) {
    return  {
        type    : UPDATE_THEME_VALUE,
        payload : { mode }
    };
}

export function initializeThemeMode() {
    return { type: INITIALIZED_THEME_MODE };
}
