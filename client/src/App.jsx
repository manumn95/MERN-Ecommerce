import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header></Header>
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default App;
