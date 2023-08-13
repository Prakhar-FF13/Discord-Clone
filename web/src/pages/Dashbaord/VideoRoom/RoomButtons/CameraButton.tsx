import { Videocam, VideocamOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const CameraButton = () => {
  const [videoOn, setVideoOn] = useState(true);

  const handleToggleVideo = () => {
    setVideoOn(!videoOn);
  };

  return (
    <IconButton onClick={handleToggleVideo} style={{ color: "white" }}>
      {videoOn ? <Videocam /> : <VideocamOff />}
    </IconButton>
  );
};

export default CameraButton;
