import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/ui/Modal";
import { toast } from "react-toastify";
import type { IBooks } from "../../@types/types";
import BCard from "../../components/layouts/BCard";
import { useTranslation } from "react-i18next";
import { useAddBookMutation, useBooksQuery } from "../../services/booksApi";
import Loader from "../../components/loaders/Loader";
import Error from "../../components/loaders/Error";

function Books() {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [addBook] = useAddBookMutation()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await addBook(data)
      toast.success(t("Book added successfully!"));
      setIsAddOpen(false);
      event.currentTarget.reset();
    } catch (err) {
      console.log(err);
      toast.error(t("Failed to add book. Please try again."));
    }
  };

  const { data: books = [], isLoading, isError } = useBooksQuery({});

  return (
    <div className="w-full text-black p-4 sm:p-6">
      {/* Modal */}
      {isAddOpen && (
        <Modal setIsOpen={setIsAddOpen}>
          <h2 className="text-xl font-semibold mb-4 text-center">
            {t("Add book")}
          </h2>
          <form
            onSubmit={handleSubmit}
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
      )}

      {/* Add book button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer shadow-md"
        >
          <span>{t("Add book")}</span>
          <CiSquarePlus size={22} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">
                {t("Book's title")}
              </th>
              <th className="border px-4 py-2 text-left">
                {t("Book's genre")}
              </th>
              <th className="border px-4 py-2 text-red-600 bg-white">
                {t("Delete")}
              </th>
              <th className="border px-4 py-2 text-yellow-500 bg-white">
                {t("Edit")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-6">
                  <Loader />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={4} className="py-6">
                  <Error />
                </td>
              </tr>
            ) : books.length > 0 ? (
              books.map((book: IBooks) => (
                <BCard key={book.id} book={book} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-6 italic"
                >
                  {t("No books found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Books;
