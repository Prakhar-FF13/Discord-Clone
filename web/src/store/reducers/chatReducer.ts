import { ACTION_TYPES, Action, Chat } from "./../../commonTypes";

const initState: Chat = {
  roomId: "",
  chatLabel: "",
  messages: [],
};

const reducer = (state = initState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SetChosenChatDetails:
      return {
        ...state,
        roomId: action.roomId,
        messages: [],
      };
    case ACTION_TYPES.SetAMessage:
      if (action.message.roomId !== state.roomId) {
        return state;
      }

      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case ACTION_TYPES.SetRoomMessages:
      const newMessages = action.messages.filter(
        (m) => m.roomId === state.roomId
      );

      return {
        ...state,
        messages: newMessages,
      };
    default:
      return state;
  }
};

export default reducer;
