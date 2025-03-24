import axiosInstance from "./interceptor";

export const userInfoService = async () => {
  const response = await axiosInstance.get("users/detail");
  return response?.data;
};
