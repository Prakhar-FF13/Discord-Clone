import { ACTION_TYPES, VideoRoomDetails } from "../../commonTypes";

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
