import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fr from "./fr.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    supportedLngs: ["fr", "en"],
    fallbackLng: "en",
    load: "languageOnly",
    interpolation: { escapeValue: false },
  });

document.documentElement.lang = i18n.resolvedLanguage ?? "en";
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
});

export default i18n;
