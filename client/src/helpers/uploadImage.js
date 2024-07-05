import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_REACT_APP_CLOUD_NAME
}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ecommerce_product");
  const dataResposne = await axios.post(url);
  return dataResposne;
};
export default uploadImage;
