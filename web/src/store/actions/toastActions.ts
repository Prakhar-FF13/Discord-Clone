import { ACTION_TYPES } from "../../commonTypes";
import { AppDispatch } from "../store";

export const toastActions = (dispatch: AppDispatch) => {
  return {
    openToast: (content: string) => dispatch(openToastMessage(content)),
    closeToast: () => dispatch(closeToastMessage()),
  };
};

export const openToastMessage = (content: string) => {
  return {
    type: ACTION_TYPES.OpenToast,
    content,
  };
};

export const closeToastMessage = () => {
  return {
    type: ACTION_TYPES.CloseToast,
  };
};

export default toastActions;
