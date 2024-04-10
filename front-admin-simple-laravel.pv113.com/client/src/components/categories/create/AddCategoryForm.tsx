import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
interface AddCategoryFormProps {
    onSubmit: (formData: FormData) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('');
    let navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Store image URL for preview

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }
        onSubmit(formData);
        navigate("/");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newImage = e.target.files?.[0];

        setImage(newImage);

        // Handle image preview if supported
        if (newImage && newImage.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImageUrl(e.target?.result as string | null);
            reader.readAsDataURL(newImage);
        } else {
            setImageUrl(null); // Clear preview if invalid image
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <label htmlFor="name" className="text-gray-700 font-medium">Category Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div className="relative w-80 h-80 overflow-hidden rounded">
                {/* Default placeholder image */}
                <img
                    src="https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Clipart-Background.png"
                    alt="Default profile photo"
                    className="absolute inset-0 w-full h-full object-cover opacity-75" // Reduce opacity for placeholder
                />
                {/* Image preview (conditionally rendered) */}
                {imageUrl && (
                    <img src={imageUrl} alt="Category preview" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-10" // Styling for file input
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Add Category
            </button>
        </form>
    );
};

export default AddCategoryForm;
