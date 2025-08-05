import { FaTrash } from "react-icons/fa"
import type { IBCardProps } from "../../@types/types"
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md"
import { useTranslation } from "react-i18next";
import { useDeleteTaskMutation } from "../../services/booksApi";

function Card({ book }: IBCardProps) {
    const [, setIsAddOpen] = useState<boolean>(false);
    const lang = localStorage.getItem("i18nextLng");
    const [deleteBooks] = useDeleteTaskMutation();
    const deleteBook = async (id: string) => {
        id
        if (!window.confirm(t("Are you sure you want to delete this category?"))) return;
        try {
            await deleteBooks(book.id) 
            toast.success(t("Category deleted successfully!"));
        } catch (err) {
            console.log(err);
            toast.error(t("Failed to update category. Please try again."));
        }
    }

    const editBook = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        try {
            await axios.put(`http://localhost:5000/categories/${book.id}`, data);
            toast.success(t("Category updated successfully!"));
            setIsEditOpen(false);
        } catch (err) {
            console.log(err);
            toast.error(t("Failed to update category. Please try again."));
        }
    }
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    return (
        <>
            <tr key={book.id}>
                <td className="border-2 px-4 py-2">
                    {
                        lang === "uz" ? 
                        book.book_name_uz : book.book_name_en
                    }
                    </td>
                <td className="border-2 text-black px-4 py-2">
                    {
                        lang === "en" ?
                            book.genre_en : book.genre_uz
                    }
                </td>
                <td onClick={() => deleteBook(book.id)} className="border-2 bg-red-600 cursor-pointer text-white border-black px-4 py-2">
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
                    <Modal setIsOpen={setIsAddOpen}>
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            {t("Add book")}
                        </h2>
                        <form
                            onSubmit={editBook}
                            className="flex flex-col gap-4 text-black"
                        >
                            <input
                                type="text"
                                placeholder={t("Book's title uz")}
                                name="book_name_uz"
                                className="border-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                                required
                            />
                            <input
                                type="text"
                                placeholder={t("Book's title en")}
                                name="book_name_en"
                                className="border-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                                required
                            />
                            <input
                                name="genre_uz"
                                placeholder={t("Book's genre uz")}
                                className="border-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                                required />
                            <input
                                name="genre_en"
                                placeholder={t("Book's genre en")}
                                className="border-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                                required />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                {t("Submit")}
                            </button>
                        </form>
                    </Modal>
                )
            }
        </>
    )
}

export default Card