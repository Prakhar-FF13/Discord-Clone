import axios from "axios";
import { User } from "./commonTypes";
import { logout } from "./common/utils/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const Token: string = JSON.parse(userDetails).Token;
      config.headers.Authorization = `Bearer ${Token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export const login = async (data: User) => {
  try {
    const res = await apiClient.post("/login", data);
    return {
      error: false,
      data: res.data,
    };
  } catch (exception) {
    return {
      error: true,
      message: "Failed to login, Something went wrong",
    };
  }
};

export const register = async (data: User) => {
  try {
    const res = await apiClient.post("/register", data);

    return {
      error: false,
      data: res.data,
    };
  } catch (exception) {
    return {
      error: true,
      message: "Failed to login, Something went wrong",
    };
  }
};

const checkResponseCode = (e: any) => {
  const code = e?.response?.status;

  if (code) {
    if (code === 401 || code === 403) logout();
  }
};
