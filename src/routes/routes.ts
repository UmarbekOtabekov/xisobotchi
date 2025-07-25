import { lazy } from "react"
import type { IRoutes } from "../@types/types"

const Dashboard = lazy(() => import("../Pages/Dashboard"))
const Categories = lazy(() => import("../Pages/Categories"))
export const routes: IRoutes[] = [
    {
        element: Dashboard,
        path: "/",
        id: 1
    },
    {
        element: Categories,
        path: "/categories",
        id: 2
    }
]