import { sendVideoRoomCreateMessage } from ".";
import { VideoRoomDetails } from "../commonTypes";
import { addNewRoom } from "../store/actions/videoRoomActions";
import store from "../store/store";

export const createNewRoom = () => {
  sendVideoRoomCreateMessage();
};

export const newRoomCreated = (roomDetails: VideoRoomDetails[]) => {
  store.dispatch(addNewRoom(roomDetails));
};
