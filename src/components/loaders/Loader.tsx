import { DotLoader } from "react-spinners"

function Loader() {
    return (
        <div className="min-h-150 w-320 flex flex-col items-center justify-center gap-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <DotLoader
                color="#22c55e" // Tailwind green-500
                loading
                size={80} // kichikroq qilib responsivlik uchun
            />  
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 animate-pulse">
                Loading...
            </h1>
        </div>
    )
}

export default Loader
