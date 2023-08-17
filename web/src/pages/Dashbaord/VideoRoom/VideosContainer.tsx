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
  minWidth: "33%",
  flex: 1,
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
      rs.srcObject = videoState.remoteUsers[i].stream;
    }
  }, [videoState]);

  console.log(videoState.remoteUsers);

  return (
    <MainContainer>
      <VideoTag id="local_stream" autoPlay />

      {videoState.remoteUsers.map((_, idx) =>
        idx > 0 ? (
          <VideoTag
            className="remote"
            autoPlay
            key={`${idx}`}
            id={`remote-video-${idx}`}
          />
        ) : null
      )}
    </MainContainer>
  );
};

export default VideoContainer;
