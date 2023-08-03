import { AppDispatch } from "../store";
import * as api from "../../api";
import { openToastMessage } from "./toastActions";
import { ACTION_TYPES, Friend } from "../../commonTypes";

export const friendsActions = (dispatch: AppDispatch) => {
  return {
    sendFriendInvitation: (mail: string, closeDialogHandler: () => void) =>
      dispatch(sendFriendInvitation(mail, closeDialogHandler)),
  };
};

export const SetPendingInvitationsAction = (
  pendingFriendsInvitations: Friend[]
) => {
  return {
    type: ACTION_TYPES.SetPendingInvitations,
    pendingFriendsInvitations,
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
