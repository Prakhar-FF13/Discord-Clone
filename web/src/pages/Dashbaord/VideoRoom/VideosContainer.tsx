import styled from "@emotion/styled";
import { useContext, useEffect } from "react";
import { VideoContext } from "../../../store/reducers/videoReducer";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideoTag = styled("video")({
  width: "33%",
});

const VideoContainer = () => {
  const { videoState } = useContext(VideoContext);

  useEffect(() => {
    const local: HTMLMediaElement = document.getElementById(
      "local_stream"
    ) as HTMLMediaElement;

    local.srcObject = videoState.localStream;

    const remotes = document.getElementsByClassName("remote");

    for (let i = 0; i < remotes.length; i++) {
      const rs: HTMLMediaElement = remotes[i] as HTMLMediaElement;
      rs.srcObject = videoState.remoteStream[i];
    }
  }, [videoState]);

  return (
    <MainContainer>
      <VideoTag id="local_stream" autoPlay />

      {videoState.remoteStream.map((_, idx) =>
        idx > 0 ? <VideoTag className="remote" autoPlay key={`${idx}`} /> : null
      )}
    </MainContainer>
  );
};

export default VideoContainer;
