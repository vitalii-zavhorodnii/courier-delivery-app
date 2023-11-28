import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Storage from '../AsyncStorage';
import ruTranslations from './locales/ru/translation.json';
import uaTranslations from './locales/uk/translation.json';

export const LANGUAGES = {
  RU: 'ru',
  UK: 'uk'
};

export const LANGUAGES_ARRAY = ['ru', 'uk'];
export const FALBACK_LANGUAGE = 'uk';

export const RESOURCES = {
  [LANGUAGES.RU]: {
    translation: ruTranslations
  },
  [LANGUAGES.UK]: {
    translation: uaTranslations
  }
};

// eslint-disable-next-line func-style
export const detectLanguage = async () => {
  const localLanguage = (await Storage.getItem('APP_LANG')) || null;

  if (localLanguage) return localLanguage;

  return FALBACK_LANGUAGE;
};

const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: async (cb) => {
    const lng = await detectLanguage();

    cb(lng);
  },
  init: () => {
    return;
  },
  cacheUserLanguage: () => {
    return;
  }
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources: RESOURCES,
    supportedLngs: LANGUAGES_ARRAY,
    fallbackLng: 'uk',
    keySeparator: false,
    returnEmptyString: false,
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
