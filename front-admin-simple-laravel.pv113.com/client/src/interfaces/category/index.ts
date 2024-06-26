import {IPaginationData, } from "../types.ts";
export interface ICategoryResponse extends IPaginationData {
    data: ICategory[];
}

export interface ICategory {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface ICreateCategory {
    name: string;
    image: File;
    description: string;
}

export interface IEditCategory {
    id: number;
    name: string;
    image?: File;
    description: string;
}