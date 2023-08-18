import { ACTION_TYPES, Action } from "./../../commonTypes";
import { VideoRoom } from "../../commonTypes";
import { createContext, Dispatch } from "react";
import { closePeerWithEmail } from "../../realtime/webRTC";

export const initState: VideoRoom = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  activeRoomDetails: null,
  rooms: [],
  localStream: null,
  remoteUsers: {},
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

export const VideoContext = createContext<{
  videoState: VideoRoom;
  setVideoState: Dispatch<any>;
}>({ videoState: initState, setVideoState: () => null });

const reducer = (state = initState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.JoinVideoRoom:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
        activeRoomDetails: action.activeRoomDetails,
      };
    case ACTION_TYPES.AddNewRoom:
      return {
        ...state,
        rooms: action.roomDetails,
      };
    case ACTION_TYPES.AddRemoteStream:
      let x = [];
      if (state.remoteUsers[action.remoteUser.mail]) {
        x = [
          ...state.remoteUsers[action.remoteUser.mail],
          action.remoteUser.stream,
        ];
      } else {
        x = [action.remoteUser.stream];
      }

      return {
        ...state,
        remoteUsers: {
          ...state.remoteUsers,
          [action.remoteUser.mail]: x,
        },
      };
    case ACTION_TYPES.AddLocalStream:
      return {
        ...state,
        localStream: action.stream,
      };
    case ACTION_TYPES.CloseVideoCall:
      return {
        ...state,
        isUserInRoom: false,
        isUserRoomCreator: false,
        activeRoomDetails: null,
        localStream: null,
        remoteUsers: {},
        audioOnly: false,
        screenSharingStream: null,
        isScreenSharingActive: false,
      };
    case ACTION_TYPES.UserLeaveVideoRoom:
      const newRemoteUsers = {
        ...state.remoteUsers,
      };
      delete newRemoteUsers[action.mail];

      closePeerWithEmail(action.mail);

      return {
        ...state,
        remoteUsers: newRemoteUsers,
      };
    default:
      return state;
  }
};

export default reducer;
