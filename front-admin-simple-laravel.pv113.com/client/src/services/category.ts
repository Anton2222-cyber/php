import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../utils/apiUrl.ts";
import {ICategoryResponse, ICreateCategory, IEditCategory} from "../interfaces/category";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api`,
        prepareHeaders: (headers) => {
            // Отримати токен з localStorage
            const token = localStorage.getItem('authToken');
            if (token) {
                // Додати заголовок Authorization з токеном
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },

    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryResponse, { page: number; search: string }>({
            query: ({ page, search }) => `/categories?page=${page}&search=${search}`,
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

                console.log("categoryID "+category.id);
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
