import {
  sendJoinVideoRoomMessage,
  sendVideoRoomCreateMessage,
  sendWebRTCAnswerMessage,
} from ".";
import { VideoRoomDetails } from "../commonTypes";
import {
  addLocalStream,
  addNewRoom,
  leaveRoom,
} from "../store/actions/videoRoomActions";
import {
  addRemoteDescription,
  createPeerConnection,
  handleGetUserMediaError,
} from "./webRTC";

const mediaConfig = {
  audio: true,
  video: {
    aspectRatio: {
      ideal: 1.333333, // 3:2 aspect is preferred
    },
  },
};

export const createNewRoom = (roomLabel: string) => {
  sendVideoRoomCreateMessage(roomLabel);
};

export const joinVideoRoom = (roomId: string) => {
  sendJoinVideoRoomMessage(roomId);
};

export const newRoomCreated = (
  roomDetails: VideoRoomDetails[],
  dispatch: React.Dispatch<any>
) => {
  dispatch(addNewRoom(roomDetails));
};

// called when a new user joins a video room.
export const videoRoomSendOffer = async (
  myMail: string,
  { mail }: { mail: string },
  dispatch: React.Dispatch<any>
) => {
  const pc = createPeerConnection(myMail, mail, dispatch, "offer");

  try {
    const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);

    dispatch(addLocalStream(stream));

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  } catch (e) {
    handleGetUserMediaError(e, dispatch);
  }
};

// called when an offer is recieved through websockets.
export const videoRoomSendAnswer = async (
  myMail: string,
  {
    offer,
    sender,
  }: {
    offer: RTCSessionDescriptionInit;
    sender: string;
  },
  dispatch: React.Dispatch<any>
) => {
  const pc = createPeerConnection(myMail, sender, dispatch, "answer");

  const desc = new RTCSessionDescription(offer);

  try {
    if (pc.signalingState !== "stable") {
      // Set the local and remove descriptions for rollback; don't proceed
      // until both return.
      await Promise.all([
        pc.setLocalDescription({ type: "rollback" }),
        addRemoteDescription(sender, desc),
      ]);
    } else {
      await addRemoteDescription(sender, desc);
    }
  } catch (e) {
    console.log("Error setting remote description in videoRoomSendAnswer", e);
  }

  const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);

  dispatch(addLocalStream(stream));

  try {
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  } catch (err) {
    console.log(err);
  }
  try {
    await pc.setLocalDescription(await pc.createAnswer());
  } catch (e) {
    console.log("Error setting local description in sendVideoAnswer", e);
  }

  if (pc.localDescription)
    sendWebRTCAnswerMessage(pc.localDescription, sender, myMail);
};

// called when an answer is recieved for an offer sent through websockets.
export const videoRoomReceiveAnswer = ({
  sender,
  answer,
}: {
  answer: RTCSessionDescriptionInit;
  sender: string;
}) => {
  const desc = new RTCSessionDescription(answer);

  addRemoteDescription(sender, desc);
};

export const leaveVideoRoomHandler = (
  mail: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch(leaveRoom(mail));
};
