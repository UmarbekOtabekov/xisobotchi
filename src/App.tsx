import { Route, Routes } from "react-router-dom"
import { routes } from "./routes/routes"
import { lazy, useEffect } from "react"
import ProtectedRoute from "./routes/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import { useSelector } from "react-redux"
import type { RootState } from "./features/store"
const Login = lazy(() => import("./Pages/Login"))
function App() {
  const { loggedIn } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(loggedIn))
  }, [loggedIn])
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {routes.map(route => (
            <Route path={route.path} element={<route.element />} />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Login />} />
      </Routes>
      <ToastContainer autoClose={1000} limit={3} />
    </>
  )
}

export default App
