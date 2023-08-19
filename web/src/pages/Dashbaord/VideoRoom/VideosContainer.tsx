import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import { VideoRoom } from "../../../commonTypes";

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

const VideoContainer = ({ videoState }: { videoState: VideoRoom }) => {
  const ids: { [key: string]: boolean } = {};

  const streams: MediaStream[] = [];
  Object.keys(videoState.remoteUsers).forEach((mail) => {
    videoState.remoteUsers[mail].forEach((s) => {
      if (!(s.id in ids) || ids[s.id] === false) {
        streams.push(s);
        ids[s.id] = true;
      }
    });
  });

  return (
    <MainContainer>
      {videoState.isScreenSharingActive && videoState.screenSharingStream ? (
        <ReactPlayer
          url={videoState.screenSharingStream}
          style={videoStyle}
          playing={true}
        />
      ) : (
        videoState.localStream && (
          <ReactPlayer
            url={videoState.localStream}
            style={videoStyle}
            playing={true}
          />
        )
      )}

      {streams.map((s) => {
        return (
          <ReactPlayer key={s.id} url={s} style={videoStyle} playing={true} />
        );
      })}
    </MainContainer>
  );
};

export default VideoContainer;
