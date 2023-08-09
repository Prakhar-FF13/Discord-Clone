import { Button, Typography } from "@mui/material";
import Avatar from "../../../../common/components/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import { chatActions } from "../../../../store/actions/chatActions";
import { ChatType } from "../../../../commonTypes";
import { ConnectedProps, connect } from "react-redux";
import { AppDispatch } from "../../../../store/store";

interface FriendListItemProps extends ReduxActions {
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
  setChosenChatDetails,
}: FriendListItemProps) {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails(
      { email: email, id: id, label: username },
      ChatType.DIRECT
    );
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

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...chatActions(dispatch),
  };
};

const connector = connect(null, mapActionsToProps);

type ReduxActions = ConnectedProps<typeof connector>;

export default connector(FriendsListItem);
