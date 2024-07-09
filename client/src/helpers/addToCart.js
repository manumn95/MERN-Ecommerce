import summaryApi from "../common";
import axios from "axios";
import { toast } from "react-toastify";
const addToCart = async (e, id) => {
  e.stopPropagation();
  e.preventDefault();
 
  const response = await axios.post(
    summaryApi.addToCartProduct.url,
    {
      body: {
        productId: id,
      },
    },
    {
      withCredentials: "include",
    }
  );

  if (response.data.success) {
    toast.success(response.data.message);
  }
  if (response.data.error) {
    toast.error(response.data.message);
  }
  return response;
};

export default addToCart;
