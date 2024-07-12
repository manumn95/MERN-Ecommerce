import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'forgot-password',
        element:<ForgotPassword></ForgotPassword>
      },
      {
        path:'sign-up',
        element:<Signup></Signup>
      },
      {
        path:"product-category",
        element:<CategoryProduct></CategoryProduct>
      },
      {
        path:"product/:id",
        element:<ProductDetail></ProductDetail>
      },
      {
        path:'cart',
        element:<Cart></Cart>
      },
      {
        path:'success',
        element:<Success></Success>
      },
      {
        path:'cancel',
        element:<Cancel></Cancel>
      },
      {
        path:"search",
        element:<SearchProduct></SearchProduct>
      },
      {
        path:'order',
        element:<OrderPage></OrderPage>
      },
      {
        path:"admin-panel",
        element:<AdminPanel></AdminPanel>,
        children:[
          {
            path:'all-users',
            element:<AllUsers></AllUsers>
          },
          {
            path:'all-products',
            element:<AllProducts></AllProducts>
          },
          {
            path:'all-Orders',
            element:<AllOrder></AllOrder>
          }
     
        ]
      }
    ],
  },
]);

export default router;
