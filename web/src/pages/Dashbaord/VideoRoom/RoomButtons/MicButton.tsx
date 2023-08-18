import { Mic, MicOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const MicButton = ({ localStream }: { localStream: MediaStream | null }) => {
  const [micOn, setMicOn] = useState(true);

  const handleToogleMic = () => {
    if (
      localStream &&
      localStream.getAudioTracks() &&
      localStream.getAudioTracks().length
    ) {
      localStream.getAudioTracks()[0].enabled =
        !localStream.getAudioTracks()[0].enabled;
      setMicOn(!micOn);
    }
  };

  return (
    <IconButton onClick={handleToogleMic} style={{ color: "white" }}>
      {micOn ? <Mic /> : <MicOff />}
    </IconButton>
  );
};

export default MicButton;
