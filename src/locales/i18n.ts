// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./lang/uz.json"; // Assuming uz.json contains the Uzbek translations
import en from "./lang/en.json"; // Assuming en.json contains the English translations
const savedLang = localStorage.getItem("i18nextLng");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uz: { translation: uz } 
   },
  lng: savedLang && ["en", "uz"].includes(savedLang) ? savedLang : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
