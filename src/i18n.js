import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import te from "./locales/te/translation.json";
const savedLang = localStorage.getItem("language");

let langCode = "en";

if (savedLang === "Hindi") langCode = "hi";
if (savedLang === "Telugu") langCode = "te";
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    te: { translation: te }
  },  
  lng: langCode, // 🔥 IMPORTANT
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;