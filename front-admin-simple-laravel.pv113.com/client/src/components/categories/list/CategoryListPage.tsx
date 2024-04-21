// CategoryListPage.tsx

import CategoryItem from "./CategoryItem.tsx";
import {useGetCategoriesQuery, useDeleteCategoryMutation} from "../../../services/category.ts"; // Імпорт мутації для видалення категорії
import Skeleton from "../../helpers/Skeleton.tsx";
import {Button} from "../../ui/Button.tsx";
import {useState} from "react";
import CategoryCreateModal from "../create/CategoryCreateModal.tsx";
import {IconPencilPlus} from "@tabler/icons-react";

const CategoryListPage = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const {data, isLoading, refetch} = useGetCategoriesQuery();
    const [deleteCategoryMutation] = useDeleteCategoryMutation(); // Отримання мутації для видалення категорії

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            // Виклик мутації для видалення категорії з заданим ідентифікатором
            await deleteCategoryMutation(categoryId);
            // Після успішного видалення перезавантажте дані
            await refetch();
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    return (
        <>
            <div className="mb-3 flex flex-row-reverse">
                <Button variant="outlined" size="lg" onClick={() => setCreateModalOpen(true)}>
                    <IconPencilPlus/>
                    Add new category
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {isLoading && <Skeleton/>}
                {data?.map(category => (
                    <CategoryItem
                        key={category.id}
                        {...category}
                        onDelete={() => handleDeleteCategory(category.id)}
                    />
                ))}
            </div>
            {createModalOpen && <CategoryCreateModal open={createModalOpen} close={() => setCreateModalOpen(false)}/>}
        </>
    );
}

export default CategoryListPage;
