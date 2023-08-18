import { ScreenShare, StopScreenShare } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { VideoRoom } from "../../../../commonTypes";
import { addScreenSharingStream } from "../../../../store/actions/videoRoomActions";
import { replaceTracks } from "../../../../realtime/webRTC";

const screenShareConstraint = {
  audio: true,
  video: true,
};

const ScreenShareButton = ({
  setVideoState,
  videoState,
}: {
  videoState: VideoRoom;
  setVideoState: React.Dispatch<any>;
}) => {
  const handleToggleScreenShare = async () => {
    if (!videoState.isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(
          screenShareConstraint
        );
      } catch (e) {
        alert("Could not share screen.");
        console.log(e);
      }

      if (stream) {
        setVideoState(addScreenSharingStream(stream));
        replaceTracks(stream);
      }
    } else {
      videoState.screenSharingStream?.getTracks().forEach((trk) => {
        trk.stop();
      });
      setVideoState(addScreenSharingStream(null));
    }
  };

  return (
    <IconButton onClick={handleToggleScreenShare} style={{ color: "white" }}>
      {videoState.isScreenSharingActive ? <StopScreenShare /> : <ScreenShare />}
    </IconButton>
  );
};

export default ScreenShareButton;
