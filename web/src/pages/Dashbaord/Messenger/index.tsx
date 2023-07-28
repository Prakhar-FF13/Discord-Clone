import { styled } from "@mui/system";

const MainContainer = styled("div")({
  flexGrow: 1,
  display: "flex",
  backgroundColor: "#36393f",
  marginTop: "48px",
});

export default function Messenger() {
  return <MainContainer></MainContainer>;
}
