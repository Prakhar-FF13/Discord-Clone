import { ACTION_TYPES, Action, User } from "../../commonTypes";

const initialState: User = {
  email: "",
  Token: "",
  password: "",
  username: "",
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SetUserDetailsAction:
      return { ...state, ...action.userDetails };
    default:
      return state;
  }
};

export default reducer;
