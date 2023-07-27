import axios from "axios";
import { User } from "./commonTypes";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
});

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
