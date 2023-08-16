import {
  sendJoinVideoRoomMessage,
  sendVideoRoomCreateMessage,
  sendWebRTCAnswerMessage,
} from ".";
import { VideoRoomDetails } from "../commonTypes";
import { addLocalStream, addNewRoom } from "../store/actions/videoRoomActions";
import {
  addPeer,
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
  { mail }: { mail: string },
  dispatch: React.Dispatch<any>
) => {
  const pc = createPeerConnection(mail, dispatch);
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
};

export const videoRoomSendAnswer = (
  {
    offer,
    mail,
  }: {
    offer: RTCSessionDescription;
    mail: string;
  },
  dispatch: React.Dispatch<any>
) => {
  const pc = createPeerConnection(mail, dispatch);

  const desc = new RTCSessionDescription(offer);

  pc.setRemoteDescription(desc)
    .then(() => navigator.mediaDevices.getUserMedia(mediaConfig))
    .then((stream: MediaStream) => {
      dispatch(addLocalStream(stream));

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    })
    .then(() => pc.createAnswer())
    .then((answer) => pc.setLocalDescription(answer))
    .then(() => {
      if (pc.localDescription)
        sendWebRTCAnswerMessage(pc.localDescription, mail);
    })
    .catch((e) => handleGetUserMediaError(e, dispatch));

  addPeer(mail, pc);
};
