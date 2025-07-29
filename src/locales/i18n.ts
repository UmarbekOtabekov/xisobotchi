// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./lang/uz.json"; // Assuming uz.json contains the Uzbek translations
import ru from "./lang/ru.json"; // Assuming ru.json contains the Russian translations
import en from "./lang/en.json"; // Assuming en.json contains the English translations
import tur from "./lang/tur.json"; // Assuming tur.json contains the Turkish translations
const savedLang = localStorage.getItem("i18nextLng");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
    tur: {translation: tur}
  },
  lng: savedLang && ["en", "ru", "uz", "tur"].includes(savedLang) ? savedLang : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
