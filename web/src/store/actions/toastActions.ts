import { ACTION_TYPES } from "../../commonTypes";
import { AppDispatch } from "../store";

export const alertActions = (dispatch: AppDispatch) => {
  return {
    openToast: (content: string) => dispatch(openToastMessage(content)),
    closeToast: () => dispatch(closeToastMessage()),
  };
};

const openToastMessage = (content: string) => {
  return {
    type: ACTION_TYPES.OpenToast,
    content,
  };
};

const closeToastMessage = () => {
  return {
    type: ACTION_TYPES.CloseToast,
  };
};

export default alertActions;
