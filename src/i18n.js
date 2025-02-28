import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/transition.json";
import hiTranslation from "./locales/hi/transition.json";
import maTranslation from "./locales/ma/translation.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language if detection fails
    debug: true, // Helpful during development
    resources: {
      en: { translation: enTranslation }, // english translation
      hi: { translation: hiTranslation }, // hindi  translation
      ma: { translation: maTranslation }, // Marathi translation
    },
  });

export default i18next;
