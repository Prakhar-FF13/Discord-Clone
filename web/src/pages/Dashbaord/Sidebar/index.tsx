import { styled } from "@mui/system";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

export default function SideBar() {
  return <MainContainer></MainContainer>;
}
