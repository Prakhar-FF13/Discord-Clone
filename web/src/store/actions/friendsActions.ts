import { AppDispatch } from "../store";
import * as api from "../../api";
import { openToastMessage } from "./toastActions";
import { ACTION_TYPES } from "../../commonTypes";

export const friendsActions = (dispatch: AppDispatch) => {
  return {
    sendFriendInvitation: (mail: string, closeDialogHandler: () => void) =>
      dispatch(sendFriendInvitation(mail, closeDialogHandler)),
  };
};

// export const SetPendingInvitationsAction = (pendingFriendInvitations) => {
//   return {
//     type: ACTION_TYPES.SetPendingInvitations,
//     pendingFriendInvitations,
//   };
// };

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
