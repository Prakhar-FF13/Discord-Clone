import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import store, { RootState } from "../../../store/store";
import { ConnectedProps, connect } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { setJoinRoom } from "../../../store/actions/videoRoomActions";
import { VideoRoomDetails } from "../../../commonTypes";
import Avatar from "../../../common/components/Avatar";
import { sendEnterVideoRoomMessage } from "../../../realtime";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

function SideBar({ rooms, Email }: StateFromRedux) {
  const handleJoinRoom = (room: VideoRoomDetails) => {
    store.dispatch(setJoinRoom(Email === room.createdBy, true, room));
    sendEnterVideoRoomMessage(room.roomId);
  };

  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {rooms.map((r) => {
        return (
          <Tooltip key={r.roomId} title={r.label}>
            <IconButton
              onClick={() => handleJoinRoom(r)}
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
              <Avatar username={r.label} />
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
    ...state.auth,
  };
};

const connector = connect(mapStateToProps, null);

type StateFromRedux = ConnectedProps<typeof connector>;

export default connector(SideBar);
