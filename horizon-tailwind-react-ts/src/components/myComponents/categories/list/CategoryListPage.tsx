// CategoryListPage.tsx

import React, { useState, useEffect } from 'react';


import axios from "axios";
import {Category} from "../../../../interfaces/interfaces";
import CategoryItem from "./CategoryItem";






const CategoryListPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios.get<Category[]>('http://laravel.pv113.com/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">Category List</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(category => (
                    <CategoryItem key={category.id} {...category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryListPage;
