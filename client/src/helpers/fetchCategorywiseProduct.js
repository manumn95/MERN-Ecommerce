import axios from "axios";
import summaryApi from "../common";

const fetchCategorywiseProduct = async (category) => {
  const response = await axios.post(summaryApi.categoryWiseProduct.url, {
    body: {
      category: category,
    },
  });

 return response
};
export default fetchCategorywiseProduct;
