import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import login_icon from "../assets/signin.gif";
import { imageToBase64 } from "../helpers/imageToBase64";
import axios from "axios";
import summaryApi from "../common";
import { toast } from "react-toastify";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const dataResponse = await axios.post(summaryApi.signUp.url, data, {
        withCredentials: true,
      });

      if (dataResponse.data.success) {
        toast.success(dataResponse.data.message);
        navigate("/login");
      } else {
        toast.error(dataResponse.data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || login_icon} alt="login-icon"></img>
            </div>
            <form>
              <label>
                <div className="text-sm bg-opacity-50 bg-slate-200 py-3 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  upload photo
                </div>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleUploadPic}
                ></input>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  placeholder="enter your name"
                  className="w-full h-full outline-none bg-transparent"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="grid">
              <label>Password:</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                ></input>
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div className="grid">
              <label>Confirm Password:</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  className="w-full h-full outline-none bg-transparent"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                ></input>
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setConfirmPassword(!showConfirmPassword)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-allall mx-auto block mt-6 hover:bg-red-700">
              SignUp
            </button>
          </form>
          <p className="my-5 text-red-600 hover:text-red-700 hover:underline">
            Already have account ? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
