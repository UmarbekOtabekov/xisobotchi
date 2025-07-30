import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type { IHeaderProps as ISidebarProps } from "../../@types/types";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";

export function Sidebar({ userName, setUserName }: ISidebarProps) {
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
  const { t } = useTranslation();
  const [isOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <aside className="h-screen flex flex-col gap-5 items-center bg-blue-600 p-4 w-1/6 min-w-50 text-white text-xl font-medium">
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        {t("Your name:")} {userName ? userName : t("Not specified")}
      </div>
      <NavLink className="hover:bg-slate-200 hover:text-black duration-300 hover:-translate-y-2 inline-block p-4 w-full border cursor-pointer" to="/">
        {t("Main")}
      </NavLink>
      <NavLink className="hover:bg-slate-200 hover:text-black duration-300 hover:-translate-y-2 inline-block p-4 w-full border cursor-pointer" to="/categories">
        {t("Categories")}
      </NavLink>
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
    </aside>
  )
}
