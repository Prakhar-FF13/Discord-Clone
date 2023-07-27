export interface User {
  Email: string;
  Username?: string;
  Password: string;
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
