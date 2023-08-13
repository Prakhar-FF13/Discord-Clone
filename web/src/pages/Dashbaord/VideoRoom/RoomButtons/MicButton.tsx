import { Mic, MicOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const MicButton = () => {
  const [micOn, setMicOn] = useState(true);

  const handleToogleMic = () => {
    setMicOn(!micOn);
  };

  return (
    <IconButton onClick={handleToogleMic} style={{ color: "white" }}>
      {micOn ? <Mic /> : <MicOff />}
    </IconButton>
  );
};

export default MicButton;
