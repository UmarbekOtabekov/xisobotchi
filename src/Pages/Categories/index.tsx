import React, { useEffect, useState } from "react"
import { CiSquarePlus } from "react-icons/ci"
import Modal from "../../components/ui/Modal"
import axios from "axios"
import { toast } from "react-toastify"
import type { IProducts } from "../../@types/types"
import Card from "../../components/layouts/Card"
import { useTranslation } from "react-i18next"

function Categories() {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post("http://localhost:5000/categories", data);
      toast.success(t("Category added successfully!"));
    } catch (err) {
      console.log(err)
      toast.error(t("Failed to add category. Please try again."));
    }
  }
  async function getData() {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setProducts(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const { t } = useTranslation();
  return (
    <div className="w-full text-black">
      <div className="flex items-end justify-end pt-50 pr-10">
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer">
          <span>
            {t("Add category")}
          </span>
          <CiSquarePlus />
        </button>
      </div>
      {
        isAddOpen && (
          <Modal setIsOpen={setIsAddOpen}>
            <h2 className="text-xl font-semibold mb-4">{t("Add category")}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder={t("Category's title")} name="category" className="border-2 px-4 py-2 rounded-md" required />
              <textarea name="description" placeholder={t("Category's description")} className="border-2 px-4 py-2 rounded-md" required></textarea>
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
              {t("Category's title")}
            </th>
            <th className="border-2 px-4 py-2">
              {t("Category's description")}
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
              <Card key={product.id} products={products} setProducts={setProducts} product={product} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Categories