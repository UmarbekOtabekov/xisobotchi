import { IoLogOut } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import '../../locales/i18n';
import type { ILang } from "../../@types/types";

export function Header() {
  const dispatch = useDispatch();
  const [lang, setLang] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
    setIsLangMenuOpen(false);
  };

  const languages: ILang[] = [
    {
      code: "en",
      name: "English",
      flag: "https://cdn.countryflags.com/thumbs/england/flag-round-250.png"
    },
    {
      code: "uz",
      name: "O'zbekcha",
      flag: "https://cdn.countryflags.com/thumbs/uzbekistan/flag-round-250.png"
    }
  ];


  return (
    <header className="flex flex-wrap items-center justify-between sm:justify-around bg-orange-500 dark:bg-orange-600 text-white p-4 shadow-lg relative">
      <h1 className="text-lg sm:text-xl font-bold">{t("My Project")}</h1>

      <div className="relative">
        <button
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-md transition"
        >
          <img
            src={languages.find(l => l.code === lang)?.flag}
            alt={lang}
            className="w-6 h-6 rounded-full"
          />
          <span className="capitalize">
            {languages.find(l => l.code === lang)?.name}
          </span>
          <ChevronDown size={18} />
        </button>

        {isLangMenuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
            {languages.map(({ code, name, flag }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                <img src={flag} alt={name} className="w-5 h-5 rounded-full" />
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition duration-200 shadow-md"
      >
        <span>{t("Logout")}</span>
        <IoLogOut size={22} />
      </button>
    </header>
  );
}
