import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

export function Header() {
  const dispatch = useDispatch();
  return (
    <header className="flex-1 flex items-center justify-between text-xl text-white font-medium bg-orange-400 p-4">
      Header
      <button onClick={() => dispatch(logout())} className="bg-red-600 hover:bg-red-700 duration-75 text-white text-xl cursor-pointer px-5 flex items-center justify-center gap-1 py-2 rounded-lg">
        <p>
          Logout
        </p>
        <IoLogOut />
      </button>
    </header>
  )
}
