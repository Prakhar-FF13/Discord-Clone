import React from "react";
import { sendWebRTCNewIceCandidateMessage, sendWebRTCOfferMessage } from ".";
import {
  addRemoteStream,
  closeVideoCallAction,
} from "../store/actions/videoRoomActions";

const peers: { [key: string]: RTCPeerConnection } = {};

export const addPeer = (mail: string, pc: RTCPeerConnection) => {
  peers[mail] = pc;
};

export const getPeer = (mail: string) => {
  return peers[mail];
};

export const addRemoteDescription = async (
  mail: string,
  desc: RTCSessionDescription
) => {
  try {
    await peers[mail].setRemoteDescription(desc).catch(reportError);
  } catch (e) {
    console.log("Error setting remote description in addRemoteDescription", e);
  }
};

export default function closeVideoCall(dispatch: React.Dispatch<any>) {
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

  dispatch(closeVideoCallAction());
}

export function handleGetUserMediaError(e: any, dispatch: React.Dispatch<any>) {
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

  closeVideoCall(dispatch);
}

export function createPeerConnection(
  myMail: string,
  targetMail: string,
  dispatch: React.Dispatch<any>,
  type: string
) {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.stunprotocol.org" },
    ],
  });

  // send ice candidate.
  // called when webrtc needs us to send ice candidate
  const handleICECandidateEvent = (ev: RTCPeerConnectionIceEvent) => {
    if (ev.candidate) {
      sendWebRTCNewIceCandidateMessage(myMail, targetMail, ev.candidate);
    }
  };

  const handleTrackEvent = (ev: RTCTrackEvent) => {
    dispatch(addRemoteStream(targetMail, ev.streams[0]));
  };

  const handleICEConnectionStateChangeEvent = (ev: Event) => {
    switch (pc.iceConnectionState) {
      case "closed":
      case "failed":
        closeVideoCall(dispatch);
        break;
    }
  };

  function handleSignalingStateChangeEvent(ev: Event) {
    switch (pc.signalingState) {
      case "closed":
        closeVideoCall(dispatch);
        break;
    }
  }

  function handleICEGatheringStateChangeEvent(ev: Event) {
    // Our sample just logs information to console here,
    // but you can do whatever you need.
    console.log("*** ICE gathering state changed to: " + pc.iceGatheringState);
  }

  // called when a track is added to a peer connection
  const handleNegotiationNeededEvent = () => {
    pc.createOffer()
      .then((offer: RTCSessionDescriptionInit) => pc.setLocalDescription(offer))
      .then(() => {
        if (pc.localDescription)
          sendWebRTCOfferMessage(pc.localDescription, targetMail, myMail, type);
      })
      .catch((e) => {
        console.log(e);
        closeVideoCall(dispatch);
      });
  };

  pc.onicecandidate = handleICECandidateEvent;
  pc.ontrack = handleTrackEvent;
  pc.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  pc.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  pc.onsignalingstatechange = handleSignalingStateChangeEvent;
  pc.onnegotiationneeded = handleNegotiationNeededEvent;

  addPeer(targetMail, pc);

  return pc;
}

export const handleNewIceCandidateMsg = ({
  sender,
  candidate,
}: {
  sender: string;
  candidate: RTCIceCandidate;
}) => {
  const can = new RTCIceCandidate(candidate),
    pc = getPeer(sender);

  if (pc) pc.addIceCandidate(can).catch((e) => console.log(e));
};
