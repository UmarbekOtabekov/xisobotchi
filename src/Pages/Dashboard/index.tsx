import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
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
      toast.success(t("Category added successfully!"));
    } catch (err) {
      console.log(err)
      toast.error(t("Failed to add category. Please try again."));
    }
  }
  async function getData() {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="w-full text-black">
      <div className="flex items-end justify-end pt-50 pr-5">
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer">
          <span>
            {t("Add product")}
          </span>
          <CiSquarePlus />
        </button>
      </div>
      {
        isAddOpen && (
          <Modal setIsOpen={setIsAddOpen}>
            <h2 className="text-xl font-semibold mb-4">{t("Add product")}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder={t("Product's title")} name="title" className="border-2 px-4 py-2 rounded-md" required />
              <input type="number" name="price" placeholder={t("Product's price")} className="border-2 px-4 py-2 rounded-md" required />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">{t("Submit")}</button>
            </form>
          </Modal>
        )
      }
      <div className="h-0 w-full p-6"></div>
      <table className="mx-auto">
        <thead>
          <tr>
            <th className="border-2 px-4 py-2">
              {t("Product's title")}
            </th>
            <th className="border-2 px-4 py-2">
              {t("Product's price")}
            </th>
            <th className="border-2 text-red-600 border-black px-4 py-2">
              {t("Delete")}
            </th>
            <th className="border-2 text-yellow-400 border-black px-4 py-2">
              {t("Edit")}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => (
              <MCard key={product.id} products={products} setProducts={setProducts} product={product} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard