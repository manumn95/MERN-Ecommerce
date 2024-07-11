import axios from "axios";
import { useContext, useEffect, useState } from "react";
import summaryApi from "../common";
import context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const contexts = useContext(context);
  const loadingCart = new Array(contexts.cartProductCount).fill(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(summaryApi.addToCartProductView.url, {
        withCredentials: "include",
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (id, qty) => {
    try {
      const response = await axios.put(
        summaryApi.updateCartProduct.url,
        {
          _id: id,
          quantity: qty + 1,
        },
        {
          withCredentials: "include",
        }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQty = async (id, qty) => {
    try {
      if (qty >= 2) {
        const response = await axios.put(
          summaryApi.updateCartProduct.url,
          {
            _id: id,
            quantity: qty - 1,
          },
          {
            withCredentials: "include",
          }
        );
        if (response.data.success) {
          fetchData();
        }
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await axios.delete(summaryApi.deleteCartProduct.url, {
        data: { _id: id },
        withCredentials: "include",
      });
      if (response.data.success) {
        fetchData();
        contexts.fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const handlePayment = async()=>{

    const stripePromise = await loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY)
    const response = await fetch(summaryApi.payment.url,{
        method : 'POST',
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify({
            cartItems : data
        })
    })               
   
    const responseData = await response.json()

    if(responseData?.id){
        stripePromise.redirectToCheckout({ sessionId : responseData.id})
    }

    console.log("payment response",responseData)
}


  useEffect(() => {
    fetchData();
  }, []);

  const totalQty = data.reduce(
    (previous, current) => previous + current.quantity,
    0
  );
  const totalPrice = data.reduce(
    (previous, current) =>
      previous + current.quantity * current?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index + "Add to cart Loading"}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product, index) => (
                <div
                  key={index + "Add to cart Loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[120px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    ></img>
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-1 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="flex justify-center items-center border border-red-600 text-red-600 w-6 h-6 rounded hover:bg-red-600 hover:text-white"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="flex justify-center items-center border border-red-600 text-red-600 w-6 h-6 rounded hover:bg-red-600 hover:text-white"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary product */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
                Total
              </div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity:</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price:</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 text-white w-full p-2"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
