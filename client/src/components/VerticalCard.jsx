import { useContext } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import scrollTop from "../helpers/scrollTop";
import { Link } from "react-router-dom";
import context from "../context";
import addToCart from "../helpers/addToCart";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-hide rounded transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]   bg-white  shadow rounded"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animation-pulse"></div>

                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animation-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animation-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animation-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-500 line-through p-1 animation-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-white transition-all px-3 py-2 text-sm p-1 animation-pulse rounded-full bg-slate-200"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                key={index}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px]   bg-white  shadow rounded"
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply "
                  ></img>
                </div>

                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white transition-all px-3 py-0.5 rounded-full text-sm"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
