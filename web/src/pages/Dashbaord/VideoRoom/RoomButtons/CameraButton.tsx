import { Videocam, VideocamOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const CameraButton = ({ localStream }: { localStream: MediaStream | null }) => {
  const [videoOn, setVideoOn] = useState(true);

  const handleToggleVideo = () => {
    if (
      localStream &&
      localStream.getVideoTracks() &&
      localStream.getVideoTracks().length
    ) {
      localStream.getVideoTracks()[0].enabled =
        !localStream.getVideoTracks()[0].enabled;
      setVideoOn(!videoOn);
    }
  };

  return (
    <IconButton onClick={handleToggleVideo} style={{ color: "white" }}>
      {videoOn ? <Videocam /> : <VideocamOff />}
    </IconButton>
  );
};

export default CameraButton;
