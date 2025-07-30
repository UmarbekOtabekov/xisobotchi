import type React from "react";
import type { LazyExoticComponent, ReactElement, SetStateAction } from "react";

export interface IRoutes {
    element: LazyExoticComponent<() => ReactElement>;
    path: string;
    id: number
}

export interface IModalProps {
    children: React.ReactNode;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

export interface ICategories {
    category: string;   
    description: string;
    id: string;
}

export interface ICardProps {
    categories: ICategories;
    setCategories: React.Dispatch<React.SetStateAction<ICategories[]>>;
    category: ICategories[];
}

export interface IHeaderProps {
    userName: string | boolean;
    setUserName: React.Dispatch<React.SetStateAction<string | boolean>>;
};

export interface IProducts {
    title: string;
    price: number;
    id: string ;
}

export interface IMCardProps {
    products: IProducts[];
    setProducts: React.Dispatch<SetStateAction<IProducts[]>>;
    product: IProducts
}