import { sendVideoRoomCreateMessage } from ".";
import { VideoRoomDetails } from "../commonTypes";
import { addNewRoom, setOpenRoom } from "../store/actions/videoRoomActions";
import store from "../store/store";

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true));
  sendVideoRoomCreateMessage();
};

export const newRoomCreated = (roomDetails: VideoRoomDetails[]) => {
  store.dispatch(addNewRoom(roomDetails));
};
