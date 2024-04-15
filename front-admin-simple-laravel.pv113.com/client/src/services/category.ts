import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../utils/apiUrl.ts";
import {ICategory, ICreateCategory, IEditCategory} from "../interfaces/category";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => "/categories",
            providesTags: ["Category"],
        }),
        addCategory: builder.mutation({
            query: (category: ICreateCategory) => {
                const categoryFormData = new FormData();
                categoryFormData.append("image", category.image);
                categoryFormData.append("name", category.name);
                categoryFormData.append("description", category.description);

                return {
                    url: "/categories/create",
                    method: "POST",
                    body: categoryFormData,
                };
            },
            //Привязуємося до тега, якщо нічого не змінилося(залишаємо стера, якщо є зміни то оновляємо)
            invalidatesTags: ["Category"],
        }),
        editCategory: builder.mutation({
            query: (category: IEditCategory) => {
                const categoryFormData = new FormData();
                if (category.image) {
                    categoryFormData.append("image", category.image);
                }
                categoryFormData.append("name", category.name);
                categoryFormData.append("description", category.description);

                return {
                    url: `categories/edit/${category.id}`,
                    method: "POST",
                    body: categoryFormData,
                };
            },
            invalidatesTags: ["Category"],
        }),


        deleteCategory: builder.mutation({
            query: (categoryId: number) => ({
                url: `/categories/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),

    }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation , useEditCategoryMutation} = categoryApi;
