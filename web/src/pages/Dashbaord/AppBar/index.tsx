import { styled } from "@mui/system";
import DropDownMenu from "./DropDownMenu";

const MainContainer = styled("div")({
  position: "absolute",
  right: 0,
  top: 0,
  height: "48px",
  borderBottom: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#36393F",
  width: "calc(100% - 326px)",
  padding: "0 15px",
});

export default function AppBar() {
  return (
    <MainContainer>
      <DropDownMenu />
    </MainContainer>
  );
}
