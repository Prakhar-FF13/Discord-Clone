import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { RootState } from "../../../store/store";
import { ConnectedProps, connect } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

function SideBar({ rooms }: StateFromRedux) {
  const handleJoinRoom = () => {};

  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {rooms.map((r) => {
        return (
          <Tooltip key={r.roomId} title={"Room Id: " + r.roomId}>
            <IconButton
              onClick={handleJoinRoom}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                margin: 0,
                padding: 0,
                minWidth: 0,
                marginTop: "10px",
                color: "white",
                backgroundColor: "#5865F2",
              }}
            >
              <PlayCircle />
            </IconButton>
          </Tooltip>
        );
      })}
    </MainContainer>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    ...state.video,
  };
};

const connector = connect(mapStateToProps, null);

type StateFromRedux = ConnectedProps<typeof connector>;

export default connector(SideBar);
