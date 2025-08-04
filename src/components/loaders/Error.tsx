import { NavLink } from "react-router-dom";

function Error() {
  const reload = () => window.location.reload();

  return (
    <div className="flex rounded-xl flex-col items-center justify-center min-h-150 bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Xatolik!</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        Noto‘g‘ri sahifa yoki kutilmagan xato yuz berdi. Quyidagi tugmalardan
        foydalanib davom etishingiz mumkin.
      </p>
      <div className="flex gap-4">
        <NavLink
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Asosiy sahifa
        </NavLink>
        <button
          onClick={reload}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
        >
          Qayta urunish
        </button>
      </div>
    </div>
  );
}

export default Error;
