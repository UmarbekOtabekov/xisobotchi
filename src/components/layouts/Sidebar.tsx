import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type { IHeaderProps as ISidebarProps } from "../../@types/types";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import { Menu, X } from "lucide-react";

export function Sidebar({ userName, setUserName }: ISidebarProps) {
  const { t } = useTranslation();
  const [isOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
    <>
      {/* Mobil navbar */}
      <div className="md:hidden flex items-center justify-between bg-blue-600 text-white px-4 py-3 shadow-lg">
        <h1 className="text-xl font-bold">Logo</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay faqat mobil uchun */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white p-6 flex flex-col gap-6 font-medium shadow-lg transform transition-transform duration-300 z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex`}
      >
        {/* User Info */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer text-center w-full bg-white/20 p-3 rounded-xl hover:bg-white/30 transition"
        >
          {t("Your name:")}{" "}
          <span className="font-bold">
            {userName ? userName : t("Not specified")}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 w-full">
          <NavLink
            className={({ isActive }) =>
              `p-3 w-full rounded-lg transition font-semibold 
              ${isActive ? "bg-white text-blue-700 shadow-md" : "hover:bg-white/20"}`
            }
            to="/"
            onClick={() => setIsSidebarOpen(false)}
          >
            {t("Main")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `p-3 w-full rounded-lg transition font-semibold 
              ${isActive ? "bg-white text-blue-700 shadow-md" : "hover:bg-white/20"}`
            }
            to="/categories"
            onClick={() => setIsSidebarOpen(false)}
          >
            {t("Categories")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `p-3 w-full rounded-lg transition font-semibold 
              ${isActive ? "bg-white text-blue-700 shadow-md" : "hover:bg-white/20"}`
            }
            to="/books"
            onClick={() => setIsSidebarOpen(false)}
          >
            {t("Books")}
          </NavLink>
        </nav>

        {/* Modal */}
        {!userName && isOpen && (
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
                className="p-2 border rounded border-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                defaultValue={typeof userName === "string" ? userName : ""}
              />
              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  name="conditions"
                  className="w-4 h-4 accent-blue-600"
                />
                <label>{t("Accept all conditions")}</label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                {t("Save")}
              </button>
            </form>
          </Modal>
        )}
      </aside>
    </>
  );
}
