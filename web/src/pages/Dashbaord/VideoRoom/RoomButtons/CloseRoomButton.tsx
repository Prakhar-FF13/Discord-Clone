import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { VideoContext } from "../../../../store/reducers/videoReducer";
import closeVideoCall from "../../../../realtime/webRTC";

const CloseRoomButton = () => {
  const { setVideoState } = useContext(VideoContext);

  const handleLeaveRoom = () => {
    closeVideoCall(setVideoState);
  };

  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
      <Close />
    </IconButton>
  );
};

export default CloseRoomButton;
