import { ScreenShare, StopScreenShare } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const ScreenShareButton = () => {
  const [isScreenSharingActive, setScreenSharingActive] = useState(false);

  const handleToggleScreenShare = () => {
    setScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <IconButton onClick={handleToggleScreenShare} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShare /> : <ScreenShare />}
    </IconButton>
  );
};

export default ScreenShareButton;
