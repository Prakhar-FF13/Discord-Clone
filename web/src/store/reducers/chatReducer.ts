import { ACTION_TYPES, Action, Chat } from "./../../commonTypes";

const initState: Chat = {
  chatDetails: null,
  chatType: null,
  messages: [],
};

const reducer = (state = initState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SetChosenChatDetails:
      return {
        ...state,
        chatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: [],
      };
    case ACTION_TYPES.SetMessages:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export default reducer;
