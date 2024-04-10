import React from 'react';
import AddCategoryForm from './AddCategoryForm';

const AddCategoryPage: React.FC = () => {
    const handleSubmit = (formData: FormData) => {
        // Тут ви можете зробити запит до вашого API для створення категорії
        fetch('http://laravel.pv113.com/api/categories/create', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                   // alert('Category added successfully!');
                    // Опціонально: перенаправлення на іншу сторінку після успішного додавання категорії
                     //history.push('/categories');
                } else {
                    throw new Error('Failed to add category');
                }
            })
            .catch((error) => {
                console.error('Error adding category:', error);
                alert('Failed to add category');
            });
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-bold mb-4">Add New Category</h2>
            <AddCategoryForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddCategoryPage;