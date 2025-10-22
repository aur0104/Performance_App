import {initReactI18next} from 'react-i18next';
import i18next, {LanguageDetectorModule} from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

import en from './en.json';

const LOCALE_PERSISTENCE_KEY = 'language';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const persistedLocale = await AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY);
    if (persistedLocale) {
      callback(persistedLocale);
    } else {
      callback('en'); // Default to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (locale: any) => {
    await AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
    },
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
  });

// 🔥 **Handle RTL Switching**
i18next.on('languageChanged', (lng: string) => {
  const isRTL = lng === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
    RNRestart.restart();
  }
});

export default i18next;
