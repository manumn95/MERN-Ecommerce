import { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <>
      <div className="bg-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Products</h2>
        <button className="border-2 border-red-600 text-red-600 py-1 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all" onClick={()=>setOpenUploadProduct(true)}>
          Upload Product
        </button>
      </div>
      {/* upload product Component */}

      {openUploadProduct && <UploadProduct onClose={()=>setOpenUploadProduct(false)}></UploadProduct>}
    </>
  );
};

export default AllProducts;
