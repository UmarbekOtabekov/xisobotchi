import type React from "react";
import type { LazyExoticComponent, ReactElement } from "react";

export interface IRoutes {
    element: LazyExoticComponent<() => ReactElement>;
    path: string;
    id: number
}
