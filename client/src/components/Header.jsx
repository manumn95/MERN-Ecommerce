import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { LuUserCircle2 } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import ROLE from "../common/role";
import context from "../context";
const Header = () => {
  const user = useSelector((state) => state?.user?.user?.data);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const contexts = useContext(context);
  const handleLogout = async (e) => {
    e.preventDefault();
    const dataResponse = await axios.get(summaryApi.user_logout.url, {
      withCredentials: "include",
    });
    if (dataResponse.data.success) {
      toast.success(dataResponse.data.message);
      dispatch(setUserDetails(null));
    }
    if (dataResponse.data.error) {
      toast.error(dataResponse.data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center justify-between px-4">
        <div className="">
          <Link to={"/"}>
         
            <Logo w={90} h={50}></Logo>
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="search"
            placeholder="search product here..."
            className="w-full outline-none "
          ></input>
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative  flex items-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((pre) => setMenuDisplay(!pre))}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-8 h-8 rounded-full"
                    alt={user?.name}
                  ></img>
                ) : (
                  <LuUserCircle2 />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 "
                      onClick={() =>
                        setMenuDisplay((pre) => setMenuDisplay(!pre))
                      }
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{contexts?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
