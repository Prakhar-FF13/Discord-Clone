import { AppDispatch } from "../store";
import * as api from "../../api";
import { openToastMessage } from "./toastActions";
import { ACTION_TYPES, Friend } from "../../commonTypes";

export const friendsActions = (dispatch: AppDispatch) => {
  return {
    sendFriendInvitation: (mail: string, closeDialogHandler: () => void) =>
      dispatch(sendFriendInvitation(mail, closeDialogHandler)),
    acceptFriendInvitation: (mail: string) =>
      dispatch(acceptFriendInvitation(mail)),
    rejectFriendInvitation: (mail: string) =>
      dispatch(rejectFriendInvitation(mail)),
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

export const SetFriends = (friends: Friend[]) => {
  return {
    type: ACTION_TYPES.SetFriends,
    friends,
  };
};

export const SetFriendIsOnline = (friend: Friend) => {
  return {
    type: ACTION_TYPES.SetFriendOnline,
    friend,
  };
};

const acceptFriendInvitation = (mail: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await api.acceptFriendInvitation(mail);
    if (res.error) {
      dispatch(
        openToastMessage(res.message ? res.message : "Something went wrong")
      );
    } else {
      dispatch(openToastMessage("Invitation has been accepted."));
    }
  };
};

const rejectFriendInvitation = (mail: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await api.rejectFriendInvitation(mail);
    if (res.error) {
      dispatch(
        openToastMessage(res.message ? res.message : "Something went wrong")
      );
    } else {
      dispatch(openToastMessage("Invitation has been rejected."));
    }
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
