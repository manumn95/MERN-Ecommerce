import { useState } from "react";
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import summaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose, userId, callFn }) => {
  const [userRole, setUserRole] = useState(role);
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const UpdateUserRole = async () => {
    const dataResponse = await axios.post(
      summaryApi.updateUser.url,
      { userId: userId, role: userRole },
      { withCredentials: true }
    );
    if (dataResponse.data.success) {
      toast.success(dataResponse.data.message);
      onClose();
      callFn();
    }
    console.log(dataResponse.data);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className=" mx-auto bg-white shadow-md p-4 w-full max-w-sm ">
        <button className="block ml-auto" onClick={onClose}>
          <IoClose />
        </button>

        <h1 className="pb-4 font-medium text-lg">Change User Role</h1>
        <p>Name:{name}</p>
        <p>Email:{email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block  rounded-full py-1 px-3 bg-red-600 text-white hover:bg-red-700"
          onClick={UpdateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
