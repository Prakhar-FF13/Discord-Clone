import {
  sendJoinVideoRoomMessage,
  sendVideoRoomCreateMessage,
  sendWebRTCAnswerMessage,
} from ".";
import { VideoRoomDetails } from "../commonTypes";
import { addLocalStream, addNewRoom } from "../store/actions/videoRoomActions";
import {
  addPeer,
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
export const videoRoomSendOffer = (
  myMail: string,
  { mail }: { mail: string },
  dispatch: React.Dispatch<any>
) => {
  const pc = createPeerConnection(myMail, mail, dispatch, "offer");
  navigator.mediaDevices
    .getUserMedia(mediaConfig)
    .then((stream: MediaStream) => {
      dispatch(addLocalStream(stream));

      // send the stream to connected peer.
      // IMPORTANT - this triggers the onnegotiationstarted event on the peer connection
      // it is handled in webRTC file.
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    })
    .catch((e) => handleGetUserMediaError(e, dispatch));
  addPeer(mail, pc);
};

// called when an offer is recieved through websockets.
export const videoRoomSendAnswer = async (
  myMail: string,
  {
    offer,
    mail,
    sender,
  }: {
    offer: RTCSessionDescriptionInit;
    mail: string;
    sender: string;
  },
  dispatch: React.Dispatch<any>
) => {
  const pc = createPeerConnection(myMail, sender, dispatch, "answer");

  const desc = new RTCSessionDescription(offer);

  if (pc.signalingState !== "stable") {
    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      pc.setLocalDescription({ type: "rollback" }),
      pc.setRemoteDescription(desc),
    ]);
    return;
  } else {
    await pc.setRemoteDescription(desc);
  }

  const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);

  dispatch(addLocalStream(stream));

  try {
    stream
      .getTracks()
      .forEach((track) => pc.addTransceiver(track, { streams: [stream] }));
  } catch (err) {
    console.log(err);
  }

  await pc.setLocalDescription(await pc.createAnswer());

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
