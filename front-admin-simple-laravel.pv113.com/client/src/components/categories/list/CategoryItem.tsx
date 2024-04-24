import {useState} from "react";
import {Button} from "../../ui/Button.tsx";
import {IconTrash, IconEdit} from "@tabler/icons-react";
import DeleteConfirmationModal from "../../ui/DeleteConfirmationModal.tsx";
import CategoryEditModal from "../edit/CategoryEditModal.tsx";
import {ICategory} from "../../../interfaces/category";

const CategoryItem: React.FC<ICategory & { onDelete: () => void; onEdit: () => void }> = ({
                                                                                              id,
                                                                                              name,
                                                                                              image,
                                                                                              description,
                                                                                              onDelete
                                                                                          }) => {
    const imageUrl = `http://laravel.pv113.com/upload/300_${image}`;
    const [deleting, setDeleting] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            onDelete();
        } catch (error) {
            console.error("Failed to delete category:", error);
        } finally {
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    return (
        <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <a href="#">
                <img className="rounded-t-lg w-full h-64 object-cover" src={imageUrl} alt={name}/>
            </a>
            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {name}
                        </h5>
                    </a>
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                </div>
                <div className="mt-auto flex justify-between">
                    <div>
                        <Button
                            variant="outlined"
                            size="sm"
                            color="red"
                            onClick={() => setConfirmDelete(true)}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : <IconTrash style={{color: "red"}}/>}
                        </Button>
                        <Button
                            variant="outlined"
                            size="sm"
                            color="blue"
                            onClick={() => setEditModalOpen(true)}
                            disabled={deleting}
                        >
                            {deleting ? "Editing..." : <IconEdit style={{color: "blue"}}/>}
                        </Button>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read more
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
                <DeleteConfirmationModal
                    open={confirmDelete}
                    close={() => setConfirmDelete(false)}
                    onConfirmDelete={handleDelete}
                />
                <CategoryEditModal
                    open={editModalOpen}
                    close={() => setEditModalOpen(false)}
                    categoryId={id}
                    categoryData={{name, description, image: undefined}}
                />
            </div>
        </div>
    );
};

export default CategoryItem;