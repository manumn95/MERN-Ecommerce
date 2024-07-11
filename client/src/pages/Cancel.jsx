import failed from "../assets/failed.gif";
import { Link } from "react-router-dom";
const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-3 rounded">
      <img src={failed} width={150} height={150} className="mix-blend-multiply"></img>
      <p className="text-red-600 font-bold text-xl">Payment Failed</p>
      <Link
        to="/cart"
        className="p-2 mt-5 border-2 border-red-600 px-3 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
      >
      Go To Cart
      </Link>
    </div>
  );
};

export default Cancel;
