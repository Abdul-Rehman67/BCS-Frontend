import axios from "axios";

// Add a request interceptor which can handle request

axios.interceptors.request.use(
  (req) => {
    console.log("req.headers",req.headers)
    let headers = {
      ...req.headers,
      authorization: `${localStorage.getItem("isAuthenticated")}`,
     
    };
    if (headers) {
      req.headers = headers;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {

    return response;
  },
  function (err) {
    if (err.response.status === 401) {
      window.location.href = "/login";
      // localStorage.removeItem('isAuthenticated')
      console.log("token not");
    }
    return Promise.reject(err);
    
  }
);

export default axios;
