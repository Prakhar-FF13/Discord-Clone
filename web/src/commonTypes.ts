export interface User {
  email: string;
  username?: string;
  password: string;
  Token?: string;
}

export const ACTION_TYPES = {
  SetUserDetailsAction: "AUTH_SET_USER_DETAILS",
};

export interface SetUserDetailsAction {
  type: "AUTH_SET_USER_DETAILS";
  userDetails?: User;
}

export type Action = SetUserDetailsAction;
