import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import type { IHeaderProps } from "../../@types/types";

export function Header({ userName, setUserName }: IHeaderProps) {
  const dispatch = useDispatch();
  const [isOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { userName: formUserName, conditions } = Object.fromEntries(formData.entries());

    if (formUserName.toString().trim() === "" && conditions === "on") {
      toast.error("Name cannot be empty!");
      return;
    }

    setUserName(formUserName.toString());
    setIsModalOpen(false);
    toast.success("Name updated successfully!");
  };

  return (
    <header className="flex-1 flex items-center justify-between text-xl text-white font-medium bg-orange-400 p-4">
      Header
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        Your name: {userName ? userName : "Not specified"}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 duration-75 text-white text-xl cursor-pointer px-5 flex items-center justify-center gap-1 py-2 rounded-lg"
      >
        <p>Logout</p>
        <IoLogOut />
      </button>

      {userName === false ? (
        isOpen ? (
          <Modal setIsOpen={setIsModalOpen}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-black text-center"
            >
              <h2 className="text-2xl font-bold">Set Your Name</h2>
              <input
                type="text"
                placeholder="Enter your name"
                name="userName"
                required
                className="p-2 border rounded border-black"
              />
              <div>
                <label className="mr-2">I accept all conditions</label>
                <input type="checkbox" required name="conditions" />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </form>
          </Modal>
        ) : null
      ) : null}
    </header>
  );
}
