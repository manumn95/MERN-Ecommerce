import axios from "axios";
import { useLocation } from "react-router-dom";
import summaryApi from "../common";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await axios.get(
      summaryApi.searchProduct.url + query.search
    );
    setLoading(false);
    setData(response.data.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading.....</p>}

      <p className="text-lg font-semibold my-3">Search Result:{data.length}</p>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data found.....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data}></VerticalCard>
      )}
    </div>
  );
};

export default SearchProduct;
