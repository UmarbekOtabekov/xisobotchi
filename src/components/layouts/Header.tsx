import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import type { IHeaderProps } from "../../@types/types";
import { useTranslation } from "react-i18next";
import '../../locales/i18n';

export function Header({ userName, setUserName }: IHeaderProps) {
  const dispatch = useDispatch();
  const [lang, setLang] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );
  const [isOpen, setIsModalOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();


  const handleLogout = () => {
    dispatch(logout());
    toast.success(t("Logged out"));
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { userName: formUserName, conditions } = Object.fromEntries(
      formData.entries()
    );
    if (!formUserName.toString().trim()) {
      toast.error(t("Name can't be empty"));
      return; 
    } else if (conditions !== "on") {
      toast.error(t("You must accept all conditions"));
      return;
    }
    setUserName(formUserName.toString());
    setIsModalOpen(false);
    toast.success(t("Name updated successfully!"));
  };

  return (
    <header className="flex-1 flex items-center justify-between text-xl text-white font-medium bg-orange-400 p-4">
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        {t("Your name:")} {userName ? userName : t("Not specified")}
      </div>
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
      {
        !userName ? (

          isOpen && (
            <Modal setIsOpen={setIsModalOpen}>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-black text-center"
              >
                <h2 className="text-2xl font-bold">{t("Set your name")}</h2>
                <input
                  type="text"
                  placeholder={t("Enter your name")}
                  name="userName"
                  className="p-2 border rounded border-black"
                  defaultValue={typeof userName === "string" ? userName : ""}
                />
                <div>
                  <label className="mr-2">{t("Accept all conditions")}</label>
                  <input type="checkbox" name="conditions" />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {t("Save")}
                </button>
              </form>
            </Modal>
          )
        ) : null
      }
    </header>
  )
}