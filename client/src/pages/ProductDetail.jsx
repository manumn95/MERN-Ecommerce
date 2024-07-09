import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import summaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const ProductDetail = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    sellingPrice: "",
    price: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinate, setZoomImageCordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await axios.post(summaryApi.productDetails.url, {
      body: {
        productId: params?.id,
      },
    });

    setLoading(false);
    setData(response?.data?.data);
    setActiveImage(response.data.data.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCordinate({
        x,
        y,
      });
    },
    [zoomImageCordinate]
  );

  const handleImageZoomOut = () => {
    setZoomImage(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply "
              onMouseMove={handleZoomImage}
              onMouseLeave={handleImageZoomOut}
              alt="Product"
            />
            {/* product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCordinate.x * 100}% ${
                      zoomImageCordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-hide h-full">
                {productImageListLoading.map((el, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-hide h-full">
                {data.productImage.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                  >
                    <img
                      src={imageUrl}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                      onClick={() => handleMouseEnterProduct(imageUrl)}
                      alt={`Product Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse rounded-full text-red-600 h-6 w-full inline-block lg:h-8"></p>
            <h2 className="text-2xl h-6 w-full lg:text-4xl font-medium bg-slate-200 animate-pulse lg:h-8"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8"></p>
            <div className="text-red-600 flex items-center gap-1 bg-slate-200 h-6 animate-pulse w-full lg:h-8"></div>

            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse w-full lg:h-8">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 lg:h-8">
              <button className="h-6 bg-slate-200 rounded animate-pulse"></button>
              <button className="h-6 bg-slate-200 rounded animate-pulse"></button>
            </div>

            <div className="w-full lg:h-8">
              <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 rounded animate-pulse"></p>
              <p className="h-12 bg-slate-200 rounded animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
              <p className="text-red-600">
                {displayCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayCurrency(data?.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white">
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        ></CategoryWiseProductDisplay>
      )}
    </div>
  );
};

export default ProductDetail;
