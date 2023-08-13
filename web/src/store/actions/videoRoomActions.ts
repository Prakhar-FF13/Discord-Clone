import { ACTION_TYPES } from "../../commonTypes";

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
