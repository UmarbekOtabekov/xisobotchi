import { DotLoader } from "react-spinners"
function Loader() {
    return (
        <div className="h-screen w-screen flex gap-5 items-center justify-center flex-col">
            <DotLoader
                color="green"
                loading
                size={100}
            />  
            <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
    )
}

export default Loader