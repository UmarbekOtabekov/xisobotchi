import { useSelector } from "react-redux"
import type { RootState } from "../features/store"
import { Sidebar } from "../components/layouts/Sidebar"
import { Header } from "../components/layouts/Header"
import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"

function ProtectedRoute() {
    const { loggedIn } = useSelector((state: RootState) => state.auth)
    const [userName, setUserName] = useState<string | boolean>(JSON.parse(localStorage.getItem("userName") || "false"));
    localStorage.setItem("userName", JSON.stringify(userName));
    if (loggedIn) {
        return (
            <div className="flex items-start text-white w-screen">
                <Sidebar userName={userName} setUserName={setUserName} />
                <div className="flex-1">
                    <Header />
                    <Outlet />
                </div>
            </div>
        )
    }
    return <Navigate to="/login" />
}

export default ProtectedRoute