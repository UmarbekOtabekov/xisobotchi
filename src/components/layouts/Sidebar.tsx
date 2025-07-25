import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="h-screen flex flex-col gap-5 items-center bg-blue-600 p-4 w-1/5 min-w-20 text-white text-xl font-medium">
      <span>
        Sidebar
      </span>
      <NavLink to="/">
        Dashboard
      </NavLink>
      <NavLink to="/categories">
        Categories
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
    </aside>
  )
}
