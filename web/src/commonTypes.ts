export interface User {
  Email: string;
  Username?: string;
  Password: string;
  Token?: string;
}

export enum ACTION_TYPES {
  UserDetails = "AUTH_SET_USER_DETAILS",
  OpenToast = "OPEN_TOAST",
  CloseToast = "CLOSE_TOAST",
}

export interface SetUserDetailsAction {
  type: ACTION_TYPES.UserDetails;
  userDetails?: User;
}

export interface ToastType {
  showToastMessage: boolean;
  toastMessageContent: string | null;
}
export interface OpenToastAction {
  type: ACTION_TYPES.OpenToast;
  content: string;
}

export interface CloseToastAction {
  type: ACTION_TYPES.CloseToast;
}

export type Action = SetUserDetailsAction | OpenToastAction | CloseToastAction;
