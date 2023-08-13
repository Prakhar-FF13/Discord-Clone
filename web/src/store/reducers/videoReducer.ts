import { ACTION_TYPES, Action } from "./../../commonTypes";
import { VideoRoom } from "../../commonTypes";

const initState: VideoRoom = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStream: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

const reducer = (state = initState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.OpenVideoRoom:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    default:
      return state;
  }
};

export default reducer;
