import styled from "@emotion/styled";
import { CloseFullscreen, OpenInFull } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const MainContainer = styled("div")({
  position: "absolute",
  bottom: "0px",
  right: "10px",
});

export default function ResizeRoomButton({
  isRoomMinimized,
  handleRoomResize,
}: {
  isRoomMinimized: boolean;
  handleRoomResize: () => void;
}) {
  return (
    <MainContainer>
      <IconButton style={{ color: "white" }} onClick={handleRoomResize}>
        {isRoomMinimized ? <OpenInFull /> : <CloseFullscreen />}
      </IconButton>
    </MainContainer>
  );
}
