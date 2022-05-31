import axios from "axios";
import store from "../store/store";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // url = api url + request url
  timeout: 60000, // request timeout
  headers: {
    Authorization: `Bearer ` + store.getters.GET_TOKEN,
  },
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.GET_TOKEN) {
      config.headers["Authorization"] = `Bearer ` + store.getters.GET_TOKEN;
      console.log(config.headers["Authorization"], "TEST_HEADERS");
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    return res;
  },
  (error) => {
    if (error.message.indexOf("timeout") !== -1) {
      return;
    }
    // Check UnAuthorized
    /*if (error.response.status === 401){
            console.log('err' + error) // for debug
        }else{
            console.log('err' + error) // for debug
        }*/
    return Promise.reject(error);
  }
);

export default service;
