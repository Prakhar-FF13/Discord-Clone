import { ACTION_TYPES } from "../../commonTypes";
import { AppDispatch } from "../store";

export const chatActions = (dispatch: AppDispatch) => {
  return {
    setChosenDetails: (details, chatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
  };
};

export const setChosenChatDetails = (chatDetails, type) => {
  return {
    type: ACTION_TYPES.SetChosenChatDetails,
    chatType: type,
    chatDetails,
  };
};

export const setMessages = (messages) => {
  return {
    type: ACTION_TYPES.SetMessages,
    messages,
  };
};
