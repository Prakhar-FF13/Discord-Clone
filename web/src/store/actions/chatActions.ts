import { ACTION_TYPES, ChatDetails, ChatType } from "../../commonTypes";
import { AppDispatch } from "../store";

export const chatActions = (dispatch: AppDispatch) => {
  return {
    setChosenChatDetails: (details: ChatDetails, chatType: ChatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
  };
};

export const setChosenChatDetails = (
  chatDetails: ChatDetails,
  type: ChatType
) => {
  return {
    type: ACTION_TYPES.SetChosenChatDetails,
    chatType: type,
    chatDetails,
  };
};

export const setMessages = (messages: string[]) => {
  return {
    type: ACTION_TYPES.SetMessages,
    messages,
  };
};
