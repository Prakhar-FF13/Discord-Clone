import { NavigateFunction } from "react-router-dom";
import * as api from "../../api";
import { ACTION_TYPES, User } from "../../commonTypes";
import { AppDispatch } from "../store";
import { openToastMessage } from "./toastActions";

export const getActions = (dispatch: AppDispatch) => {
  return {
    login: (userDetails: User, navigate: NavigateFunction) =>
      dispatch(loginApi(userDetails, navigate)),
    register: (userDetails: User, navigate: NavigateFunction) =>
      dispatch(registerApi(userDetails, navigate)),
  };
};

const setUserDetails = (userDetails: User) => {
  return {
    type: ACTION_TYPES.UserDetails,
    userDetails,
  };
};

const loginApi = (userDetails: User, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    const res = await api.login(userDetails);

    if (res.error) {
      dispatch(
        openToastMessage(res.message ? res.message : "Something went wrong")
      );
    } else {
      const user: User = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserDetails(user));
      navigate("/dashboard");
    }
  };
};

const registerApi = (userDetails: User, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    const res = await api.register(userDetails);

    if (res.error) {
      dispatch(
        openToastMessage(res.message ? res.message : "Something went wrong")
      );
    } else {
      const user: User = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserDetails(user));
      navigate("/dashboard");
    }
  };
};
