import styled from "@emotion/styled";

const Container = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  fontSize: "12px",
  backgroundColor: "#5865f2",
  color: "white",
});

const styleMinimized = {
  transform: "translateY(-100%)",
};

const styleFullScreen = {
  transform: "translateY(100%)",
};

export default function VideoRoomLabel({
  isRoomMinimized,
  roomId = "",
}: {
  isRoomMinimized: boolean;
  roomId: string;
}) {
  return (
    <Container style={isRoomMinimized ? styleMinimized : styleFullScreen}>
      {"RoomId: " + roomId}
    </Container>
  );
}
