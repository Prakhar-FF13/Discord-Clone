import { sendJoinVideoRoomMessage, sendVideoRoomCreateMessage } from ".";
import { VideoRoomDetails } from "../commonTypes";
import { addNewRoom } from "../store/actions/videoRoomActions";
import store from "../store/store";

export const createNewRoom = (roomLabel: string) => {
  sendVideoRoomCreateMessage(roomLabel);
};

export const joinVideoRoom = (roomId: string) => {
  sendJoinVideoRoomMessage(roomId);
};

export const newRoomCreated = (roomDetails: VideoRoomDetails[]) => {
  store.dispatch(addNewRoom(roomDetails));
};
