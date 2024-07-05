import axios from "axios";
import { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:''
  });

  const fetchAllUsers = async () => {
    const dataResponse = await axios.get(summaryApi.allUsers.url, {
      withCredentials: "include",
    });

    if (dataResponse.data.success) {
      setAllUsers(dataResponse.data.data);
    }
    if (dataResponse.data.error) {
      toast.error(dataResponse.data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <div className="bg-white pb-4">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>Sl.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format("ll")}</td>
                  <td>
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500  hover:text-white"
                      onClick={() => {
                        setOpenUpdateModel(true);
                        setUpdateUserDetails(el)
                      }}
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {openUpdateModel && (
          <ChangeUserRole
            onClose={() => setOpenUpdateModel(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFn={fetchAllUsers}
          ></ChangeUserRole>
        )}
      </div>
    </>
  );
};

export default AllUsers;
