import { FaTrash } from "react-icons/fa"
import type { ICardProps } from "../../@types/types"
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md"
import { useTranslation } from "react-i18next";

function Card({ product, setProducts, products }: ICardProps) {
    const deleteCategory = async (id: string) => {
        if (!window.confirm(t("Are you sure you want to delete this category?"))) return;
        try {
            await axios.delete(`http://localhost:5000/categories/${id}`);
            setProducts(products.filter(product => product.id !== id));
            toast.success(t("Category deleted successfully!"));
        } catch (err) {
            console.log(err);
            toast.error(t("Failed to update category. Please try again."));
        }
    }

    const editCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        try {
            await axios.put(`http://localhost:5000/categories/${product.id}`, data);
            toast.success(t("Category updated successfully!"));
            setIsEditOpen(false);
        } catch (err) {
            console.log(err);
            toast.error(t("Failed to update category. Please try again."));
        }
    }
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const { t } = useTranslation()
    return (
        <>
            <tr key={product.id}>
                <td className="border-2 px-4 py-2">
                    {product.category}
                </td>
                <td className="border-2 px-4 py-2">
                    {product.description}
                </td>
                <td onClick={() => deleteCategory(product.id)} className="border-2 bg-red-600 cursor-pointer text-white border-black px-4 py-2">
                    <span className="flex items-center justify-center gap-1">
                        {t("Delete")}
                        <FaTrash />
                    </span>
                </td>
                <td onClick={() => setIsEditOpen(true)} className="border-2 bg-yellow-500 cursor-pointer text-white border-black px-4 py-2">
                    <span className="flex items-center justify-center gap-1">
                        {t("Edit")}
                        <MdModeEdit />
                    </span>
                </td>
            </tr>
            {
                isEditOpen && (
                    <Modal setIsOpen={setIsEditOpen}>
                        <h2 className="text-xl font-semibold mb-4">{t("Edit Category")}</h2>
                        <form onSubmit={editCategory} className="flex flex-col gap-4">
                            <input defaultValue={product.category} type="text" placeholder={t("Category's title")} name="category" className="border-2 px-4 py-2 rounded-md" required />
                            <textarea defaultValue={product.description} name="description" placeholder={t("Category's description")} className="border-2 px-4 py-2 rounded-md" required></textarea>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">{t("Submit")}</button>
                        </form>
                    </Modal>
                )
            }
        </>
    )
}

export default Card