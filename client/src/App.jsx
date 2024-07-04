import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer></ToastContainer>
      <Header></Header>
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default App;
