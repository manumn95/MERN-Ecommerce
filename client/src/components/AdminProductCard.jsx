import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div>
      <div className="bg-white p-8 rounded shadow-md ">
        <div className="w-40 ">
          <div className="w-32 h-32 flex justify-center items-center">
            <img
              src={data?.productImage[0]}
              width={120}
              height={120}
              className="  object-contain h-full w-full mx-auto "
            ></img>
          </div>
          <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

          <div>
            <p className="font-semibold">
              {displayINRCurrency(data.sellingPrice)}
            </p>
            <div
              className="w-fit ml-auto p-2 bg-green-300 rounded-full text-white hover:bg-green-600 hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
          </div>
        </div>
        {editProduct && (
          <AdminEditProduct
            productData={data}
            onClose={() => setEditProduct(false)}
            fetchData={fetchData}
          ></AdminEditProduct>
        )}
      </div>
    </div>
  );
};

export default AdminProductCard;
