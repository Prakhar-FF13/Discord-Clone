import { ACTION_TYPES, Action } from "./../../commonTypes";
import { VideoRoom } from "../../commonTypes";
import { createContext, Dispatch } from "react";

export const initState: VideoRoom = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  activeRoomDetails: null,
  rooms: [],
  localStream: null,
  remoteStream: [],
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
      return {
        ...state,
        remoteStream: [...state.remoteStream, action.stream],
      };
    case ACTION_TYPES.AddLocalStream:
      return {
        ...state,
        localStream: action.stream,
      };
    case ACTION_TYPES.CloseVideoCall:
      state.localStream?.getTracks().forEach((trk) => trk.stop());
      state.remoteStream?.forEach((rs) =>
        rs.getTracks().forEach((trk) => trk.stop())
      );
      return {
        ...state,
        isUserInRoom: false,
        isUserRoomCreator: false,
        activeRoomDetails: null,
        localStream: null,
        remoteStream: [],
        audioOnly: false,
        screenSharingStream: null,
        isScreenSharingActive: false,
      };
    default:
      return state;
  }
};

export default reducer;
