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
  }
};
export default summaryApi;
