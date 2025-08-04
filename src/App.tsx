import { Route, Routes } from "react-router-dom"
import { routes } from "./routes/routes"
import { lazy, useEffect } from "react"
import ProtectedRoute from "./routes/ProtectedRoute"
import { Bounce, ToastContainer } from "react-toastify"
import { useSelector } from "react-redux"
import type { RootState } from "./app/store"
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
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
