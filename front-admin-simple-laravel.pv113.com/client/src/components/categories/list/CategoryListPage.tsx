// CategoryListPage.tsx


import {useGetCategoriesQuery, useDeleteCategoryMutation} from "../../../services/category.ts"; // Імпорт мутації для видалення категорії
import Skeleton from "../../helpers/Skeleton.tsx";
import {Button} from "../../ui/Button.tsx";
import {useState} from "react";
import CategoryCreateModal from "../create/CategoryCreateModal.tsx";
import {IconPencilPlus} from "@tabler/icons-react";
import {useSearchParams} from "react-router-dom";
import {useDebouncedCallback} from "use-debounce";
import {Input} from "../../ui/Input.tsx";
import CategoryGrid from "./CategoryGrid.tsx";
import showToast from "../../../utils/showToast.ts";


const CategoryListPage = () => {
    const[searchParams, setSearchParams]=useSearchParams();

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    // const {data, isLoading, refetch} = useGetCategoriesQuery();
    const [deleteCategoryMutation] = useDeleteCategoryMutation(); // Отримання мутації для видалення категорії

    const { data: categories, isLoading ,refetch} = useGetCategoriesQuery({
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") || "",
    });

    const handleSearch = useDebouncedCallback((term) => {
        if (term) {
            searchParams.set("search", term);
            setSearchParams(searchParams);
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }
    }, 400);

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            // Виклик мутації для видалення категорії з заданим ідентифікатором
            await deleteCategoryMutation(categoryId);
            showToast(`Category ${categoryId} successful deleted!`, "success");
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

                <Input
                    defaultValue={searchParams.get("search") || ""}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    className="hidden md:flex"
                    variant="search"
                    placeholder="Search..."
                />

            </div>

                {isLoading && <Skeleton/>}
                {/*{categories?.data?.map(category => (*/}
                {/*    <CategoryItem*/}
                {/*        key={category.id}*/}
                {/*        {...category}*/}
                {/*        onDelete={() => handleDeleteCategory(category.id)}*/}
                {/*    />*/}
                {/*))}*/}

                <CategoryGrid
                    categories={categories?.data}
                    totalPages={categories?.last_page}
                    handleDelete={handleDeleteCategory}
                    isLoading={isLoading}
                />

            {createModalOpen && <CategoryCreateModal open={createModalOpen} close={() => setCreateModalOpen(false)}/>}
        </>
    );
}

export default CategoryListPage;
