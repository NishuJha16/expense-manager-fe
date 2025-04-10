import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",
  // baseURL: "https://expense-manager-server-m5ol.onrender.com",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return error;
  }
);

export default axiosInstance;
