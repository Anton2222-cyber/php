import Modal from "../../ui/Modal.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE} from "../../../constants";
import {Input} from "../../ui/Input.tsx";
import {Button} from "../../ui/Button.tsx";
import Label from "../../ui/Label.tsx";
import FormError from "../../ui/FormError.tsx";
// Потрібно імпортувати функцію для редагування категорії
import {useEffect} from "react";
import {IconCirclePlus, IconCircleX, IconLoader} from "@tabler/icons-react";
import Title from "../../ui/Title.tsx";
import showToast from "../../../utils/showToast.ts";
import {useEditCategoryMutation} from "../../../services/category.ts";

type EditCategoryModalProps = {
    open: boolean;
    close: () => void;
    categoryId: number; // Ідентифікатор категорії, яку ми будемо редагувати
    // prevImage: string;
    categoryData: {
        name: string;
        description: string;
        image: File | undefined;
    };
};


type EditCategorySchemaType = z.infer<typeof EditCategorySchema>;

const EditCategorySchema = z.object({
    name: z.string().trim().min(3).max(20),
    description: z.string().trim().min(3).max(50),
    image: z  .any()
        .refine((files) => files.length === 0 || files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)  .refine(
            (files) => files.length === 0 || ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type),    "Only .jpg, .jpeg, .png and .webp files are accepted.",
        ),
});

const CategoryEditModal = (props: EditCategoryModalProps) => {
    const {close, categoryId, categoryData} = props;
    const [editCategory, {isLoading}] = useEditCategoryMutation(); // Використовуємо функцію для редагування категорії

    const {
        register,
        handleSubmit,
        reset,
// Функція для встановлення значення поля форми
        formState: {errors},
    } = useForm<EditCategorySchemaType>({
        resolver: zodResolver(EditCategorySchema),
        defaultValues: categoryData, // Встановлюємо значення полів форми за замовчуванням
    });

    useEffect(() => {
        reset(categoryData); // При зміні categoryData встановлюємо нові значення для форми
    }, [categoryData, reset]);

    const onSubmit = handleSubmit(async (data) => {

        try {
            await editCategory({id: categoryId, ...data, image: data.image[0]}).unwrap();
            showToast(`Category ${data.name} successfully edited!`, "success");
            close();
        } catch (err:  any) {
            console.log(err);

            showToast(`Error editing ${data.name} category! ${err.error}`, "error");
        }
    });

    return (
        <Modal {...props}>
            <Title className="pb-5">Edit category</Title>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input {...register("name")} id="name" placeholder="Name..."/>
                {errors?.name && <FormError errorMessage={errors?.name?.message as string}/>}

                <Label htmlFor="description">Description</Label>
                <Input {...register("description")} id="description" placeholder="Description..."/>
                {errors?.description && <FormError errorMessage={errors?.description?.message as string}/>}

                <Label htmlFor="image">Image</Label>
                <Input {...register("image")} id="image" variant="file" type="file" placeholder="Image..."/>
                {errors?.image && <FormError errorMessage={errors?.image?.message as string}/>}
                {/*<img src={props.prevImage}/>*/}

                <div className="flex w-full items-center justify-center gap-5">
                    <Button disabled={isLoading} size="lg" type="submit">
                        {isLoading ? (
                            <>
                                <IconLoader/>
                                Loading...
                            </>
                        ) : (
                            <>
                                <IconCirclePlus/>
                                Save Changes
                            </>
                        )}
                    </Button>
                    <Button disabled={isLoading} size="lg" type="button" variant="cancel" onClick={() => close()}>
                        <IconCircleX/>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CategoryEditModal;
