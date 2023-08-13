import { Stream } from "stream";

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

export interface ChatMessage {
  createdBy: string;
  date: string;
  email: string;
  message: string;
  roomId: string;
  username: string;
}

export interface Chat {
  roomId: string;
  messages: ChatMessage[];
  chatLabel: string;
}

export interface VideoRoom {
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
  roomDetails: null;
  activeRooms: [];
  localStream: Stream | null;
  remoteStream: Stream[];
  audioOnly: boolean;
  screenSharingStream: Stream | null;
  isScreenSharingActive: boolean;
}

export enum WebSocketMessageKind {
  FriendInvitations = "friend-invitations",
  Friends = "friends",
  FriendOnline = "friend-online",
  FriendOffline = "friend-offline",
  Message = "chat-message",
  RoomChange = "room-change",
  RoomMessages = "room-messages",
  VideoRoomCreate = "video-room-create",
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
  SetAMessage = "SET_A_MESSAGES",
  SetRoomMessages = "SET_ROOM_MESSAGES",
  OpenVideoRoom = "OPEN_VIDEO_ROOM",
  SetVideoRoomDetails = "SET_VIDEO_ROOM_DETAILS",
  SetActiveRooms = "SET_ACTIVE_VIDEO_ROOMS",
  SetLocalStream = "SET_LOCAL_STREAM",
  SetRemoteStreams = "SET_REMOTE_STREAMS",
  SetAudioOnly = "SET_AUDIO_ONLY",
  SetScreenShareStream = "SET_SCREEN_SHARE_STREAM",
}

export interface SetOpenVideoRoomAction {
  type: ACTION_TYPES.OpenVideoRoom;
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
}

export interface SetChosenChatDetailsAction {
  type: ACTION_TYPES.SetChosenChatDetails;
  roomId: string;
  messages: ChatMessage[];
}

export interface SetAMessageAction {
  type: ACTION_TYPES.SetAMessage;
  message: ChatMessage;
}

export interface SetRoomMessagesAction {
  type: ACTION_TYPES.SetRoomMessages;
  messages: ChatMessage[];
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
  | SetAMessageAction
  | SetRoomMessagesAction
  | SetOpenVideoRoomAction;
