export interface User {
  Id?: number;
  Email: string;
  Username?: string;
  Password: string;
  Token?: string;
  isOnline?: boolean | undefined;
}

export interface ToastType {
  showToastMessage: boolean;
  toastMessageContent: string | null;
}
export interface Friends {
  friends: Friend[];
  pendingFriendsInvitations: Friend[];
  onlineUsers: [];
}

export interface Friend {
  id: number;
  email: string;
  username: string;
  status?: string;
  isOnline?: boolean;
}

export interface Chat {
  roomId: string;
  messages: string[];
  chatLabel: string;
}

export enum WebSocketResponse {
  FriendInvitations = "friend-invitations",
  Friends = "friends",
  FriendOnline = "friend-online",
  FriendOffline = "friend-offline",
}

export enum ACTION_TYPES {
  UserDetails = "AUTH_SET_USER_DETAILS",
  OpenToast = "OPEN_TOAST",
  CloseToast = "CLOSE_TOAST",
  SetFriends = "SET_FRIENDS",
  SetPendingInvitations = "SET_PENDING_INVITATIONS",
  SetOnlineUsers = "SET_ONLINE_USERS",
  SetFriendOnline = "SET_FRIEND_ONLINE",
  SetFriendOffline = "SET_FRIEND_OFFLINE",
  SetChosenChatDetails = "SET_CHOSEN_CHAT_DETAILS",
  SetMessages = "SET_MESSAGES",
}

export enum ChatType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}
export interface SetChosenChatDetailsAction {
  type: ACTION_TYPES.SetChosenChatDetails;
  roomId: string;
  messages: string[];
}

export interface SetMessageAction {
  type: ACTION_TYPES.SetMessages;
  messages: string[];
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

export interface SetFriendIsOnlineAction {
  type: ACTION_TYPES.SetFriendOnline;
  friend: Friend;
}

export interface SetFriendIsOfflineAction {
  type: ACTION_TYPES.SetFriendOffline;
  friend: Friend;
}

export type Action =
  | SetUserDetailsAction
  | OpenToastAction
  | CloseToastAction
  | SetFriendsAction
  | SetOnlineUsersAction
  | SetPendingInvitationsAction
  | SetFriendIsOnlineAction
  | SetFriendIsOfflineAction
  | SetChosenChatDetailsAction
  | SetMessageAction;
