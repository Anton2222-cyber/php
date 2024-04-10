import CategoryItem from "./CategoryItem.tsx";
import {useEffect, useState} from "react";
import {ICategory} from "../../../interfaces/category";
import axios from "axios";
import {Link} from "react-router-dom";

const CategoryListPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        axios.get<ICategory[]>('http://laravel.pv113.com/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <>
            <Link to="/add-category" className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Category</Link>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {categories.map(category => (
                    <CategoryItem key={category.id} {...category} />
                ))}
            </div>
        </>
    );
}

export default CategoryListPage;