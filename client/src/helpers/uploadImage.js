import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUD_NAME}/image/upload`;

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_REACT_APP_UPLOAD_PRESET);

    const dataResponse = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return dataResponse.data;
  } catch (error) {
    console.error("Error uploading image:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default uploadImage;
