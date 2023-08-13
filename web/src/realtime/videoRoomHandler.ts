import { sendVideoRoomCreateMessage } from ".";
import { setOpenRoom } from "../store/actions/videoRoomActions";
import store from "../store/store";

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true));
  sendVideoRoomCreateMessage();
};
