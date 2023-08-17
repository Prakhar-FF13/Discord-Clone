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
  remoteUsers: [],
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
        remoteUsers: [...state.remoteUsers, action.remoteUser],
      };
    case ACTION_TYPES.AddLocalStream:
      return {
        ...state,
        localStream: action.stream,
      };
    case ACTION_TYPES.CloseVideoCall:
      const local: HTMLMediaElement = document.getElementById(
        "local_stream"
      ) as HTMLMediaElement;

      if (local && local.srcObject) {
        local.pause();
        (local.srcObject as MediaStream)
          .getTracks()
          .forEach((trk) => trk.stop());
        local.srcObject = null;
      }

      const remotes = document.getElementsByClassName("remote");

      for (let i = 0; i < remotes.length; i++) {
        if (remotes[i]) {
          const rs: HTMLMediaElement = remotes[i] as HTMLMediaElement;
          if (rs.srcObject) {
            rs.pause();
            (rs.srcObject as MediaStream)
              .getTracks()
              .forEach((trk) => trk.stop());
            rs.srcObject = null;
          }
        }
      }

      state.localStream?.getTracks().forEach((trk) => trk.stop());
      state.remoteUsers?.forEach((rs) =>
        rs.stream.getTracks().forEach((trk) => trk.stop())
      );
      return {
        ...state,
        isUserInRoom: false,
        isUserRoomCreator: false,
        activeRoomDetails: null,
        localStream: null,
        remoteUsers: [],
        audioOnly: false,
        screenSharingStream: null,
        isScreenSharingActive: false,
      };
    case ACTION_TYPES.UserLeaveVideoRoom:
      state.remoteUsers.forEach((ru, idx) => {
        if (ru.email === action.mail) {
          const rm = document.getElementById(
            `remote-video-${idx}`
          ) as HTMLMediaElement;
          if (rm && rm.srcObject) {
            rm.pause();
            (rm.srcObject as MediaStream)
              .getTracks()
              .forEach((trk) => trk.stop());
            rm.srcObject = null;
          }

          ru.stream.getTracks().forEach((trk) => trk.stop());
        }
      });

      const newRemoteUsers = state.remoteUsers.filter(
        (rs) => rs.email !== action.mail
      );

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
