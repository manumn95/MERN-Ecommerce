import { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    selling: "",
    price: "",
  });

  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

  const handleOnChange = (e) => {};
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);
    console.log(file.name);
    const uploadImageCloudinary = await uploadImage(file);
    console.log(uploadImageCloudinary);
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-35">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl cursor-pointer rounded hover:bg-red-600"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-5">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          ></input>

          <label htmlFor="brandName" className="mt-3">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          ></input>

          <label htmlFor="brandName" className="mt-3">
            category:
          </label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
          >
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                ></input>
              </div>
            </div>
          </label>

          <div>
            <img
              src=""
              alt=""
              width={80}
              height={80}
              className="bg-slte-100 border mb-3"
            ></img>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
