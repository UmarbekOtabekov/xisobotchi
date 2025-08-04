import type React from "react";
import type { LazyExoticComponent, ReactElement, SetStateAction } from "react";

export interface IRoutes {
    element: LazyExoticComponent<() => ReactElement>;
    path: string;
    id: number
}

export interface IModalProps {
    children: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ICategories {
    category: string;   
    description: string;
    id: string;
}

export interface IBooks {
    janr_uz: string;   
    janr_en: string;
    book_name_uz: string;
    book_name_en: string;
    id: string;
}

export interface IBCardProps {
    book: IBooks;
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

export interface ILang {
      code: string;
      name: string;
      flag: string
}