import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import '../../locales/i18n';

export function Header() {
  const dispatch = useDispatch();
  const [lang, setLang] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );
  const { t, i18n } = useTranslation();
  const handleLogout = () => {
    dispatch(logout());
  };
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };
  return (
    <header className="flex-1 flex items-center justify-around  text-xl text-white font-medium bg-orange-400 p-4">

      <select
        className="p-2 text-white rounded"
        name="lang"
        id="lang"
        value={lang}
        onChange={changeLanguage}
      >
        <option className="text-black" value="en">English</option>
        <option className="text-black" value="uz">O&apos;zbekcha</option>
        <option className="text-black" value="ru">Русский</option>
        <option className="text-black" value="tur">Turkçe</option>
      </select>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 duration-75 text-white text-xl cursor-pointer px-5 flex items-center justify-center gap-1 py-2 rounded-lg"
      >
        <p>{t("Logout")}</p>
        <IoLogOut />
      </button>
    </header>
  )
}