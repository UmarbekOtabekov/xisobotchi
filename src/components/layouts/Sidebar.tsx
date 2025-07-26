import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="h-screen flex flex-col gap-5 items-center bg-blue-600 p-4 w-1/6 min-w-10 text-white text-xl font-medium">
      <span>
        Sidebar
      </span>
      <NavLink className="hover:bg-slate-200 hover:text-black duration-300 hover:-translate-y-2 inline-block p-4 w-full border cursor-pointer" to="/">
        Dashboard
      </NavLink>
      <NavLink className="hover:bg-slate-200 hover:text-black duration-300 hover:-translate-y-2 inline-block p-4 w-full border cursor-pointer" to="/categories">
        Categories
      </NavLink>
    </aside>
  )
}
