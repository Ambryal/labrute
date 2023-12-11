import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './assets/i18n/fr.json';
import en from './assets/i18n/en.json';
import es from './assets/i18n/es.json';
import de from './assets/i18n/de.json';
import ru from './assets/i18n/ru.json';
import pt from './assets/i18n/pt.json';
import { DEFAULT_LANGUAGE } from '@labrute/core';
import { Lang } from '@labrute/prisma';

export const defaultNS = 'common';
export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
  de: {
    translation: de,
  },
  ru: {
    translation: ru,
  },
  pt: {
    translation: pt,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  resources,
  interpolation: {
    escapeValue: false
  },
  fallbackLng: Lang.en,
}).catch((err) => {
  console.error('Error loading language', err);
});

export default i18n;