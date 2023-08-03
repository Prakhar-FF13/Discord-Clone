export interface User {
  Email: string;
  Username?: string;
  Password: string;
  Token?: string;
}

export interface ToastType {
  showToastMessage: boolean;
  toastMessageContent: string | null;
}

export interface Friends {
  friends: [];
  pendingFriendsInvitations: FriendInvitation[];
  onlineUsers: [];
}

export interface FriendInvitation {
  id: number;
  email: string;
  username: string;
}

export enum WebSocketResponse {
  FriendInvitation = "friend-invitations",
}

export enum ACTION_TYPES {
  UserDetails = "AUTH_SET_USER_DETAILS",
  OpenToast = "OPEN_TOAST",
  CloseToast = "CLOSE_TOAST",
  SetFriends = "SET_FRIENDS",
  SetPendingInvitations = "SET_PENDING_INVITATIONS",
  SetOnlineUsers = "SET_ONLINE_USERS",
}

export interface SetUserDetailsAction {
  type: ACTION_TYPES.UserDetails;
  userDetails?: User;
}

export interface OpenToastAction {
  type: ACTION_TYPES.OpenToast;
  content: string;
}

export interface CloseToastAction {
  type: ACTION_TYPES.CloseToast;
}

export interface SetFriendsAction {
  type: ACTION_TYPES.SetFriends;
  friends: [];
}

export interface SetPendingInvitationsAction {
  type: ACTION_TYPES.SetPendingInvitations;
  pendingFriendsInvitations: [];
}

export interface SetOnlineUsersAction {
  type: ACTION_TYPES.SetOnlineUsers;
  onlineUsers: [];
}

export type Action =
  | SetUserDetailsAction
  | OpenToastAction
  | CloseToastAction
  | SetFriendsAction
  | SetOnlineUsersAction
  | SetPendingInvitationsAction;
