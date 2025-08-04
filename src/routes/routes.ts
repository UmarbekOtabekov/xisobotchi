import { lazy } from "react"
import type { IRoutes } from "../@types/types"

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Categories = lazy(() => import("../Pages/Categories"));
const Books = lazy(() => import("../Pages/Books"))
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
    },
    {
        element: Books,
        path: "/books",
        id: 3
    }
]