import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import summaryApi from "./common";
import context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import "./../src/App.css";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    const dataResponse = await axios.get(summaryApi.current_users.url, {
      withCredentials: "include",
    });
    if (dataResponse.data.success) {
      dispatch(setUserDetails(dataResponse.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const response = await axios.get(summaryApi.countAddedProduct.url, {
      withCredentials: "include",
    });
    setCartProductCount(response?.data?.data?.count);
  };

  useEffect(() => {
    /* user-Details */
    fetchUserDetails();
    //count added ptroduct
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center"></ToastContainer>
        <Header></Header>
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet></Outlet>
        </main>

        <Footer></Footer>
      </context.Provider>
    </>
  );
};

export default App;
