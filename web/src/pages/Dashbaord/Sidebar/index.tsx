import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { RootState } from "../../../store/store";
import { ConnectedProps, connect } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { setJoinRoom } from "../../../store/actions/videoRoomActions";
import { VideoRoomDetails } from "../../../commonTypes";
import Avatar from "../../../common/components/Avatar";
import { sendEnterVideoRoomMessage } from "../../../realtime";
import { useContext } from "react";
import { VideoContext } from "../../../store/reducers/videoReducer";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

function SideBar({ Email }: StateFromRedux) {
  const { videoState, setVideoState } = useContext(VideoContext);

  const handleJoinRoom = (room: VideoRoomDetails) => {
    setVideoState(setJoinRoom(Email === room.createdBy, true, room));
    sendEnterVideoRoomMessage(room.roomId);
  };

  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {videoState.rooms.map((r) => {
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
    ...state.auth,
  };
};

const connector = connect(mapStateToProps, null);

type StateFromRedux = ConnectedProps<typeof connector>;

export default connector(SideBar);
