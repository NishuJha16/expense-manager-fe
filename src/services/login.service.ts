import axios from "axios";

export const loginService = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:3002/auth/login", {
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
  const response = await axios.post("http://localhost:3002/users/create", {
    username,
    password,
    name,
  });
  return response.data;
};
