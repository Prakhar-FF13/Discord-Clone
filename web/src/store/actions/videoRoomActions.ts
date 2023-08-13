import { ACTION_TYPES, VideoRoomDetails } from "../../commonTypes";

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: ACTION_TYPES.OpenVideoRoom,
    isUserInRoom,
    isUserRoomCreator,
  };
};

export const addNewRoom = (roomDetails: VideoRoomDetails[]) => {
  return {
    type: ACTION_TYPES.AddNewRoom,
    roomDetails,
  };
};
