import {
  ACTION_TYPES,
  AddRemoteStreamAction,
  AddScreenShareStreamAction,
  VideoRoomDetails,
} from "../../commonTypes";

export const removeLocalStream = () => {
  return {
    type: ACTION_TYPES.RemoveLocalStream,
  };
};

export const removeRemoteStream = (mail: string, streamId: string) => {
  return {
    type: ACTION_TYPES.RemoveAStream,
    mail,
    streamId,
  };
};

export const addScreenSharingStream = (
  stream: MediaStream | null
): AddScreenShareStreamAction => {
  return {
    type: ACTION_TYPES.AddScreenShareStream,
    stream,
    isScreenSharingActive: stream ? true : false,
  };
};

export const addRemoteStream = (
  email: string,
  stream: MediaStream
): AddRemoteStreamAction => {
  return {
    type: ACTION_TYPES.AddRemoteStream,
    mail: email,
    stream: stream,
  };
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

export const leaveRoom = (mail: string) => {
  return {
    type: ACTION_TYPES.UserLeaveVideoRoom,
    mail,
  };
};

export const addNewRoom = (roomDetails: VideoRoomDetails[]) => {
  return {
    type: ACTION_TYPES.AddNewRoom,
    roomDetails,
  };
};
