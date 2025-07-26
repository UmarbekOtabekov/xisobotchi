import type React from "react";
import type { LazyExoticComponent, ReactElement } from "react";

export interface IRoutes {
    element: LazyExoticComponent<() => ReactElement>;
    path: string;
    id: number
}

export interface IModalProps {
    children: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IProducts {
    category: string;
    description: string;
}