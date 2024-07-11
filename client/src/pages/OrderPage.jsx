import axios from "axios";
import { useEffect, useState } from "react";
import summaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetials = async () => {
    const response = await axios.get(summaryApi.getOrder.url, {
      withCredentials: "include",
    });
    setData(response.data.data);
  };
  console.log(data);
  useEffect(() => {
    fetchOrderDetials();
  }, []);

  return (
    <div>
      {!data[0] && <p>No Orders for you...</p>}

      <div className="p-4 ">
        {data.map((item, index) => {
          return (
            <div key={index} className="border ">
              <p className="font-medium text-lg">
                {moment(item.currentAt).format("ll")}
              </p>

             <div className="border rounded">


           <div className="flex flex-col lg:flex-row justify-between">

           <div className="grid gap-1">
                {item?.productDetails.map((product, index) => {
                  return (
                    <div key={index} className="flex gap-3 bg-slate-100">
                      <img
                        src={product.image[0]}
                        className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                      ></img>
                      <div>
                        <div className="font=medium text-lg text-ellipsis line-clamp-1">{product.name}</div>

                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-lg text-red-500">{displayINRCurrency(product.price)}</div>
                          <p>Quantity:{product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
             
             <div className="flex flex-col p-2 min-w-[300px]">
             <div>
                <div className="text-lg font-semibold">Payment Details:</div>
                <p className="font-medium ml-1">
                  Payment Method:{item.paymentDetails.payment_method_type[0]}
                </p>
                <p className="font-medium ml-1">Payment Status : {item.paymentDetails.payment_status}</p>
              </div>

              <div>
                <div className="text-lg font-semibold">Shipping Details:</div>
                {item.shipping_options.map((shipping, index) => {
                  return (
                    <div key={index}className="font-medium text-lg  ml-auto w-fit">
                      Shipping Amount:{shipping.shipping_amount}
                    </div>
                  );
                })}
              </div>
             </div>

           </div>

              <div>
                <div className="font-semibold ">Total Amount:{displayINRCurrency(item.totalAmount)}</div>
              </div>


             </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
