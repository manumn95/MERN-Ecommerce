import { useState } from "react";
import login_icon from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={login_icon} alt="login-icon"></img>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
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
            <div>
              <label>Password:</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                ></input>
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit py-2  ml-auto hover:underline hover:text-red-600"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-allall mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-5 text-red-600 hover:text-red-700 hover:underline">
            Don't have account ? <Link to={"/sign-up"}>SignUp</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
