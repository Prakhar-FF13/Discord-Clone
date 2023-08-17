import styled from "@emotion/styled";
import { useContext } from "react";
import { VideoContext } from "../../../store/reducers/videoReducer";
import ReactPlayer from "react-player";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  overflowY: "auto",
});

const videoStyle = {
  minWidth: "33%",
  flex: 1,
  display: "flex",
};

const VideoContainer = () => {
  const { videoState } = useContext(VideoContext);

  return (
    <MainContainer>
      {videoState.localStream && (
        <ReactPlayer
          url={videoState.localStream}
          style={videoStyle}
          playing={true}
        />
      )}

      {videoState.remoteUsers.map((ru, idx) => (
        <ReactPlayer
          key={`${idx}`}
          url={ru.stream}
          style={videoStyle}
          playing={true}
        />
      ))}
    </MainContainer>
  );
};

export default VideoContainer;
