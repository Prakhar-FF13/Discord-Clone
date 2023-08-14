import styled from "@emotion/styled";
import { useState } from "react";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons";
import VideoRoomLabel from "./VideoRoomLabel";
import { RootState } from "../../../store/store";
import { ConnectedProps, connect } from "react-redux";

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

const VideoRoom = ({ roomId }: StateFromRedux) => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
      <VideosContainer />
      <RoomButtons />
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={roomResizeHandler}
      />
      <VideoRoomLabel isRoomMinimized={isRoomMinimized} roomId={roomId || ""} />
    </MainContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    ...state.video.activeRoomDetails,
  };
};

const connector = connect(mapStateToProps, null);

type StateFromRedux = ConnectedProps<typeof connector>;

export default connector(VideoRoom);
