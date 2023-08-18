import styled from "@emotion/styled";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import React from "react";
import { VideoRoom } from "../../../../commonTypes";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = ({
  setVideoState,
  videoState,
}: {
  setVideoState: React.Dispatch<any>;
  videoState: VideoRoom;
}) => {
  return (
    <MainContainer>
      <ScreenShareButton
        videoState={videoState}
        setVideoState={setVideoState}
      />
      <MicButton localStream={videoState.localStream} />
      <CloseRoomButton setVideoState={setVideoState} />
      <CameraButton localStream={videoState.localStream} />
    </MainContainer>
  );
};

export default RoomButtons;
