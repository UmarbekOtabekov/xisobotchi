import { MdOutlineCancel } from "react-icons/md"
import type { IModalProps } from "../../@types/types"

function Modal({ children, setIsOpen }: IModalProps) {
  return (
    <div className="w-full fixed pt-10 z-[9999] top-0 left-0 h-screen bg-black/70">
      <MdOutlineCancel onClick={() => setIsOpen?.(false)} className="absolute right-[30%] text-red-600 text-xl cursor-pointer" />
      <div className="bg-white rounded-lg max-w-110 p-10 mx-auto ">
        {children}
      </div>
    </div>
  )
}

export default Modal