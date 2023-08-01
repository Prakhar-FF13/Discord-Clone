import { AppDispatch } from "../store";
import * as api from "../../api";
import { openToastMessage } from "./toastActions";

export const friendsActions = (dispatch: AppDispatch) => {
  return {
    sendFriendInvitation: (mail: string, closeDialogHandler: () => void) =>
      dispatch(sendFriendInvitation(mail, closeDialogHandler)),
  };
};

const sendFriendInvitation = (mail: string, closeDialogHandler: () => void) => {
  return async (dispatch: AppDispatch) => {
    const res = await api.sendFriendInvitation(mail);

    if (res.error) {
      dispatch(
        openToastMessage(res.message ? res.message : "Something went wrong")
      );
    } else {
      dispatch(openToastMessage("Invitation has been sent."));
      closeDialogHandler();
    }
  };
};
