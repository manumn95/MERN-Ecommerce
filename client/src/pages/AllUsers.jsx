import axios from "axios";
import { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from 'moment';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const dataResponse = await axios.get(summaryApi.allUsers.url, {
      withCredentials: "include",
    });
    console.log(dataResponse.data.data);
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
            <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            </tr>
           
          </thead>
          <tbody >
            {allUsers.map((el,index)=>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                </tr>
              )
                
              
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
