import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import closeVideoCall from "../../../../realtime/webRTC";
import { sendLeaveVideoRoomMessage } from "../../../../realtime";

const CloseRoomButton = ({
  setVideoState,
}: {
  setVideoState: React.Dispatch<any>;
}) => {
  const handleLeaveRoom = () => {
    sendLeaveVideoRoomMessage();
    closeVideoCall(setVideoState);
  };

  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
      <Close />
    </IconButton>
  );
};

export default CloseRoomButton;
