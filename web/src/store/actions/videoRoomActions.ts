import { ACTION_TYPES, VideoRoomDetails } from "../../commonTypes";

export const addRemoteStream = (stream: MediaStream) => {
  return { type: ACTION_TYPES.AddRemoteStream, stream };
};

export const addLocalStream = (stream: MediaStream | null) => {
  return { type: ACTION_TYPES.AddLocalStream, stream };
};

export const closeVideoCallAction = () => {
  return { type: ACTION_TYPES.CloseVideoCall };
};

export const setJoinRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false,
  activeRoomDetails: VideoRoomDetails
) => {
  return {
    type: ACTION_TYPES.JoinVideoRoom,
    isUserInRoom,
    isUserRoomCreator,
    activeRoomDetails,
  };
};

export const addNewRoom = (roomDetails: VideoRoomDetails[]) => {
  return {
    type: ACTION_TYPES.AddNewRoom,
    roomDetails,
  };
};
