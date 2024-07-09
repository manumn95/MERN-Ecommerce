const backendDomain = "http://localhost:8000";
const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
  },
  current_users: {
    url: `${backendDomain}/api/user-details`,
  },

  user_logout: {
    url: `${backendDomain}/api/user-logout`,
  },
  allUsers:{
    url:`${backendDomain}/api/allUsers`
  },
  updateUser:{
    url:`${backendDomain}/api/updateUser`
  },
  
    uploadProducts:{
      url:`${backendDomain}/api/upload-product`
    
  },
  allProduct:{
    url:`${backendDomain}/api/getProduct`
  },
  updateProduct:{
    url:`${backendDomain}/api/update-product`
  },
  categoryProduct:{
    url:`${backendDomain}/api/get-category-product`
  },
  categoryWiseProduct:{
    url:`${backendDomain}/api/category-product`
  },
  productDetails:{
    url:`${backendDomain}/api/product-details`
  },
  addToCartProduct:{
    url:`${backendDomain}/api/addToCart`
  },
  countAddedProduct:{
    url:`${backendDomain}/api/countAddedProduct`
  },
  addToCartProductView:{
    url:`${backendDomain}/api/viewCartProduct`
  },
  updateCartProduct:{
    url:`${backendDomain}/api/update-cart-product`
  },
  deleteCartProduct:{
    url:`${backendDomain}/api/delete-cart-product`
  },
  searchProduct:{
    url:`${backendDomain}/api/search`
  }
};
export default summaryApi;
