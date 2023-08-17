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
    const local = document.getElementById("local_stream") as HTMLMediaElement;
    if (local) {
      local.srcObject = videoState.localStream;
    }

    const remotes = document.getElementsByClassName("remote");

    for (let i = 0; i < remotes.length; i++) {
      const rs = remotes[i] as HTMLMediaElement;
      if (rs) {
        rs.srcObject = videoState.remoteUsers[i].stream;
      }
    }
  }, [videoState]);

  return (
    <MainContainer>
      {videoState.localStream && <VideoTag id="local_stream" autoPlay />}

      {videoState.remoteUsers.map((_, idx) => (
        <VideoTag
          className="remote"
          autoPlay
          key={`${idx}`}
          id={`remote-video-${idx}`}
        />
      ))}
    </MainContainer>
  );
};

export default VideoContainer;
