import { Route, Routes } from "react-router-dom"
import { routes } from "./routes/routes"
import { Sidebar } from "./components/layouts/Sidebar"
import { Header } from "./components/layouts/Header"
import { lazy, useState } from "react"
const Login = lazy(() => import("./Pages/Login"))
function App() {
  const [logged, setIsLogged] = useState<boolean>(false)
  return (
    <>
      {
        logged ?
          (<div className="flex items-start text-white w-screen">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <Routes>
                {routes.map(route => (
                  <Route path={route.path} element={<route.element />} />
                ))}
              </Routes>
            </div>
          </div>) :
          (<Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Login />} />
          </Routes>)
      }
      <button onClick={() => setIsLogged(!logged)} className="bg-red-600 px-4 py-2 text-white rounded-md cursor-pointer m-1">Change</button>
    </>
  )
}

export default App
