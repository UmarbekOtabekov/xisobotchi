import { useSelector } from "react-redux"
import type { RootState } from "../features/store"
import { Sidebar } from "../components/layouts/Sidebar"
import { Header } from "../components/layouts/Header"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
    const { loggedIn } = useSelector((state: RootState) => state.auth)
    if (loggedIn) {
        return (
            <div className="flex items-start text-white w-screen">
                <Sidebar />
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