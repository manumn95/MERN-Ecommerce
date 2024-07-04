import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import axios from "axios";
import summaryApi from "./common";
import context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

const App = () => {

  const dispatch = useDispatch();

  const fetchUserDetails = async ()=>{
    const dataResponse = await axios.get(summaryApi.current_users.url,{
      withCredentials:'include'
    })
  if(dataResponse.data.success)
    {
dispatch(setUserDetails(dataResponse.data))
    }
  }
  useEffect(()=>{

    /* user-Details */
fetchUserDetails();

  },[])

  return (
    <>
  
  <context.Provider value={{
    fetchUserDetails
  }}>
      <ToastContainer></ToastContainer>
      <Header></Header>
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
  </context.Provider>
  
    </>
  );
};

export default App;
