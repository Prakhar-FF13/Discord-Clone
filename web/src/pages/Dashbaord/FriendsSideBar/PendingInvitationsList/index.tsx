import { styled } from "@mui/system";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

export default function PendingInvitationsList() {
  return <MainContainer></MainContainer>;
}
