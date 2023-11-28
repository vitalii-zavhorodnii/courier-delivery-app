import api from '../../apiSingleton';
import Storage from '../AsyncStorage';

export async function setLanguageToStorage(lang) {
    api.apiClient.setLanguage(lang);
    await Storage.setItem('APP_LANG', lang);
}

export async function getLanguageFromStorage() {
    const lang = await Storage.getItem('APP_LANG') || null;

    return lang;
}

export async function saveThemeValueToStorage(value) {
    Storage.setItem('isDarkTheme', value);
}

export async function getThemeValueFromStorage() {
    const theme = await Storage.getItem('isDarkTheme');

    return theme;
}
