import { ACTION_TYPES, ChatMessage } from "../../commonTypes";
import { AppDispatch } from "../store";

export const chatActions = (dispatch: AppDispatch) => {
  return {
    setChosenChatDetails: (roomId: string, chatLabel: string) =>
      dispatch(setChosenChatDetails(roomId, chatLabel)),
  };
};

export const setChosenChatDetails = (roomId: string, chatLabel: string) => {
  return {
    type: ACTION_TYPES.SetChosenChatDetails,
    roomId,
    chatLabel,
  };
};

export const setAMessage = (message: ChatMessage) => {
  return {
    type: ACTION_TYPES.SetAMessage,
    message,
  };
};

export const setRoomMessages = (messages: ChatMessage[]) => {
  return {
    type: ACTION_TYPES.SetRoomMessages,
    messages,
  };
};
