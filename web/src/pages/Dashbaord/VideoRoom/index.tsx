import styled from "@emotion/styled";
import { useContext, useState } from "react";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons";
import VideoRoomLabel from "./VideoRoomLabel";
import { VideoContext } from "../../../store/reducers/videoReducer";

const MainContainer = styled("div")({
  position: "absolute",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#202225",
});

const fullScreenRoomStyle = {
  width: "100%",
  height: "100vh",
};

const minimizedRoomStyle = {
  bottom: "0px",
  right: "0px",
  width: "30%",
  height: "40vh",
};

const VideoRoom = () => {
  const { videoState, setVideoState } = useContext(VideoContext);

  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
      <VideosContainer videoState={videoState} />
      <RoomButtons videoState={videoState} setVideoState={setVideoState} />
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={roomResizeHandler}
      />
      <VideoRoomLabel
        isRoomMinimized={isRoomMinimized}
        roomId={videoState.activeRoomDetails?.roomId || ""}
      />
    </MainContainer>
  );
};

export default VideoRoom;
