const backendDomin = "http://localhost:3000";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },

  signIN: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },

  current_user : {
    url: `${backendDomin}/api/userdetails`,
    method:"get",
  },
  logout_user :{
    url:`${backendDomin}/api/userLogout`,
    method:"get",
  }
};

export default SummaryApi;
