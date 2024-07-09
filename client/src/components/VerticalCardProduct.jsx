import { useEffect, useRef, useState } from "react";
import fetchCategorywiseProduct from "../helpers/fetchCategorywiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadingList = new Array(13).fill(null);
  const [scroll, isScroll] = useState(0);
  const scrollElement = useRef();
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchCategorywiseProduct(category);
      setData(response.data.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto p-4  relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-hide rounded transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

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
                  to={"product/" + product?._id}
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]   bg-white  shadow rounded"
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
                      onClick={(e) => addToCart(e, product?._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
