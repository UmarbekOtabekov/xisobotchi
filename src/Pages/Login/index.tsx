import type React from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { tel, password } = Object.fromEntries(formData.entries());
    if (tel === "330565212" && password === "qwerty" || tel === "507809843" && password === "123456" || tel === "1" && password === "hello") {
      toast.success(t("You logged"));
      dispatch(login());
      navigate("/")
    } else {
      toast.error("Password or tel is incorrect!");
      event.currentTarget.reset();
    }
  }
  return (
    <div className="bg-slate-400 pt-5 h-screen">
      <form onSubmit={handleSubmit} className="flex bg-white rounded-xl w-fit mx-auto flex-col gap-4 items-center p-20">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span>
            {t("Login")}
          </span>
          <IoLogIn />
        </h1>
        <input required className="border-2 px-4 py-2 rounded-md" name="tel" type="tel" placeholder={t("Tel")} />
        <input required className="border-2 px-4 py-2 rounded-md" name="password" type="password" placeholder={t("Password")} autoComplete="off" />
        <button className="bg-blue-600 px-4 py-2  flex items-center justify-center gap-1 font-medium w-full text-white rounded-md cursor-pointer">{t("Login")} <IoLogIn /></button>
      </form>
    </div>
  )
}