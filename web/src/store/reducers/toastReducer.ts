import { ACTION_TYPES, Action } from "../../commonTypes";

const initialState = {
  showToastMessage: false,
  toastMessageContent: null,
};

type ToastType = typeof initialState;

const reducer = (state: ToastType = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.OpenToast:
      return {
        ...state,
        showToastMessage: true,
        toastMessageContent: action.content,
      };
    case ACTION_TYPES.CloseToast:
      return {
        ...state,
        showToastMessage: false,
      };
    default:
      return state;
  }
};

export default reducer;
