import { Button, Typography } from "@mui/material";
import Avatar from "../../../../common/components/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import { chatActions } from "../../../../store/actions/chatActions";
import { ConnectedProps, connect } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { sendChangeRoom } from "../../../../realtime/websockets";

interface FriendListItemProps extends ReduxStateAndActions {
  username: string;
  isOnline: boolean;
  id: number;
  email: string;
}

function FriendsListItem({
  id,
  username,
  isOnline,
  email,
  Id,
  setChosenChatDetails,
}: FriendListItemProps) {
  const handleChooseActiveConversation = () => {
    if (Id) {
      const roomId = `${Math.min(id, Id)}-${Math.max(id, Id)}`;
      sendChangeRoom(roomId);
      setChosenChatDetails(roomId, username);
    }
  };

  return (
    <>
      <Button
        onClick={handleChooseActiveConversation}
        style={{
          width: "100%",
          height: "42px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "none",
          color: "black",
          position: "relative",
        }}
      >
        <Avatar username={username} />
        <Typography
          style={{
            marginLeft: "7px",
            fontWeight: "700",
            color: "#8e9297",
          }}
          variant="subtitle1"
          align="left"
        >
          {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
      </Button>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    Id: state.auth.Id,
  };
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...chatActions(dispatch),
  };
};

const connector = connect(mapStateToProps, mapActionsToProps);

type ReduxStateAndActions = ConnectedProps<typeof connector>;

export default connector(FriendsListItem);
