import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import bg from './translations/bg.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      bg: { translation: bg }
    },
    lng: 'bg', // Език по подразбиране
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;