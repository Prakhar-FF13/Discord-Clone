import axios from "axios";
import { User } from "./commonTypes";
import { logout } from "./common/utils/auth";
import { validateEmail } from "./common/utils/validators";

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

// secure routes

const checkResponseCode = (e: any) => {
  const code = e?.response?.status;

  if (code) {
    if (code === 401 || code === 403) logout();
  }
};

export const sendFriendInvitation = async (mail: string) => {
  try {
    if (!validateEmail(mail)) {
      return {
        error: true,
      };
    }

    const res = await apiClient.post("/friend-invitation/invite", {
      mail: mail,
    });
    return {
      error: false,
      data: res.data,
    };
  } catch (e: any) {
    checkResponseCode(e);
    return {
      error: true,
      message: "Something weng wrong",
    };
  }
};

export const fetchFriends = async (mail: string) => {
  try {
    if (!validateEmail(mail)) {
      return {
        error: true,
      };
    }

    const res = await apiClient.post("/fetch-friends", {
      mail: mail,
    });
    return {
      error: false,
      data: res.data,
    };
  } catch (e: any) {
    checkResponseCode(e);
    return {
      error: true,
      message: "Something weng wrong",
    };
  }
};

export const acceptFriendInvitation = async (mail: string) => {
  try {
    if (!validateEmail(mail)) {
      return {
        error: true,
      };
    }

    const res = await apiClient.post("/friend-invitation/accept", {
      mail: mail,
    });
    return {
      error: false,
      data: res.data,
    };
  } catch (e: any) {
    checkResponseCode(e);
    return {
      error: true,
      message: "Something weng wrong in accepting invitation",
    };
  }
};

export const rejectFriendInvitation = async (mail: string) => {
  try {
    if (!validateEmail(mail)) {
      return {
        error: true,
      };
    }

    const res = await apiClient.post("/friend-invitation/reject", {
      mail: mail,
    });
    return {
      error: false,
      data: res.data,
    };
  } catch (e: any) {
    checkResponseCode(e);
    return {
      error: true,
      message: "Something weng wrong in rejecting invitation",
    };
  }
};
