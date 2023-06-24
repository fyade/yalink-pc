import axios from "axios";

const env = import.meta.env
let ax = axios.create({
  baseURL: env.VITE_APP_REQ_PREFIX,
  timeout: 3000
})

// Add a request interceptor
ax.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);

// Add a response interceptor
ax.interceptors.response.use(
    function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return response.statusText;
      }
    },
    function (error) {
      return Promise.reject(error);
    }
);

export default ax
