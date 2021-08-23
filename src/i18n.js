import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        supportedLngs: ['en', 'fr'],
        fallbackLng: 'en',
        debug: true,
        detection: {
            order: ['localStorage', 'htmlTag'],
        },
        backend: {
            loadPath: '/local/{{lng}}/translation.json'
        }
    });


export { i18n };