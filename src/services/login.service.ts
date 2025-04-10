import axiosInstance from "./interceptor";

const baseURL = "https://expense-manager-server-m5ol.onrender.com";
export const loginService = async (username: string, password: string) => {
  const response = await axiosInstance.post(`auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const registerService = async (
  username: string,
  password: string,
  name: string
) => {
  const response = await axiosInstance.post("users/create", {
    username,
    password,
    name,
  });
  return response.data;
};

export const logoutService = async () => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};
