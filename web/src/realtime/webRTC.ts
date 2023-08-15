import { sendWebRTCNewIceCandidateMessage, sendWebRTCOfferMessage } from ".";
import {
  addRemoteStream,
  closeVideoCallAction,
} from "../store/actions/videoRoomActions";
import store from "../store/store";

const peers: { [key: string]: RTCPeerConnection } = {};

export const addPeer = (mail: string, pc: RTCPeerConnection) => {
  peers[mail] = pc;
};

export const getPeer = (mail: string) => {
  return peers[mail];
};

export default function closeVideoCall() {
  Object.keys(peers).forEach((k) => {
    peers[k].ontrack = null;
    peers[k].onicecandidate = null;
    peers[k].oniceconnectionstatechange = null;
    peers[k].onsignalingstatechange = null;
    peers[k].onicegatheringstatechange = null;
    peers[k].onnegotiationneeded = null;

    peers[k].getTransceivers().forEach((transceiver) => {
      transceiver.stop();
    });

    peers[k].close();
    delete peers[k];
  });

  store.dispatch(closeVideoCallAction());
}

export function handleGetUserMediaError(e: Error) {
  switch (e.name) {
    case "NotFoundError":
      alert(
        "Unable to open your call because no camera and/or microphone" +
          "were found."
      );
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert(`Error opening your camera and/or microphone: ${e.message}`);
      break;
  }

  closeVideoCall();
}

export function createPeerConnection(mail: string) {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun.stunprotocol.org" },
    ],
  });

  // called when a track is added to a peer connection
  const handleNegotiationNeededEvent = () => {
    pc.createOffer()
      .then((offer: RTCSessionDescriptionInit) => {
        pc.setLocalDescription(offer).then(() => {
          if (pc.localDescription) {
            sendWebRTCOfferMessage(pc.localDescription, mail);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        closeVideoCall();
      });
  };

  // send ice candidate.
  // called when webrtc needs us to send ice candidate
  const handleICECandidateEvent = (ev: RTCPeerConnectionIceEvent) => {
    if (ev.candidate) {
      sendWebRTCNewIceCandidateMessage(mail, ev.candidate);
    }
  };

  const handleTrackEvent = (ev: RTCTrackEvent) => {
    store.dispatch(addRemoteStream(ev.streams[0]));
  };

  const handleICEConnectionStateChangeEvent = (ev: Event) => {
    switch (pc.iceConnectionState) {
      case "closed":
      case "failed":
        closeVideoCall();
        break;
    }
  };

  function handleSignalingStateChangeEvent(ev: Event) {
    switch (pc.signalingState) {
      case "closed":
        closeVideoCall();
        break;
    }
  }

  function handleICEGatheringStateChangeEvent(ev: Event) {
    // Our sample just logs information to console here,
    // but you can do whatever you need.
  }

  pc.onicecandidate = handleICECandidateEvent;
  pc.ontrack = handleTrackEvent;
  pc.onnegotiationneeded = handleNegotiationNeededEvent;
  pc.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  pc.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  pc.onsignalingstatechange = handleSignalingStateChangeEvent;

  addPeer(mail, pc);

  return pc;
}

export const handleNewIceCandidateMsg = ({
  mail,
  candidate,
}: {
  mail: string;
  candidate: RTCIceCandidate;
}) => {
  const can = new RTCIceCandidate(candidate);

  getPeer(mail)
    .addIceCandidate(can)
    .catch((e) => console.log(e));
};
