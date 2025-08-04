import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSquarePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import Modal from "../../components/ui/Modal";
import type { IProducts } from "../../@types/types";
import MCard from "../../components/layouts/MCard";

function Dashboard() {
  const { t } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProducts[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post("http://localhost:5000/products", data);
      toast.success(t("Product added successfully!"));
      setIsAddOpen(false);
      getData();
    } catch (err) {
      console.log(err);
      toast.error(t("Failed to add product. Please try again."));
    }
  };

  async function getData() {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full text-black p-4 sm:p-6">
      {/* Add product button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer shadow-md"
        >
          <span>{t("Add product")}</span>
          <CiSquarePlus size={22} />
        </button>
      </div>

      {/* Modal */}
      {isAddOpen && (
        <Modal setIsOpen={setIsAddOpen}>
          <h2 className="text-xl font-semibold mb-4 text-center">
            {t("Add product")}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-black"
          >
            <input
              type="text"
              placeholder={t("Product's title")}
              name="title"
              className="border-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
            <input
              type="number"
              name="price"
              placeholder={t("Product's price")}
              className="border-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              {t("Submit")}
            </button>
          </form>
        </Modal>
      )}

      {/* Responsive table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">
                {t("Product's title")}
              </th>
              <th className="border px-4 py-2 text-left">
                {t("Product's price")}
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
            {products.length > 0 ? (
              products.map((product) => (
                <MCard
                  key={product.id}
                  products={products}
                  setProducts={setProducts}
                  product={product}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-6 italic"
                >
                  {t("No products found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
