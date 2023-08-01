import { ACTION_TYPES, Action, Friends } from "../../commonTypes";

const initialState: Friends = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SetPendingInvitations:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitations,
      };
    case ACTION_TYPES.SetFriends:
      return {
        ...state,
        friends: action.friends,
      };
    case ACTION_TYPES.SetOnlineUsers:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    default:
      return state;
  }
};

export default reducer;
