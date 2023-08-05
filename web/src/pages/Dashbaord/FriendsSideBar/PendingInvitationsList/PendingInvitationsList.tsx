import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import Avatar from "../../../../common/components/Avatar";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import { ConnectedProps, connect } from "react-redux";
import { friendsActions } from "../../../../store/actions/friendsActions";
import { AppDispatch } from "../../../../store/store";

interface PendingInvitationsListProps extends ReduxActions {
  username: string;
  email: string;
}

function PendingInvitationsList({
  username,
  email,
  acceptFriendInvitation,
  rejectFriendInvitation,
}: PendingInvitationsListProps) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleAcceptInvitation = () => {
    acceptFriendInvitation(email);
    setButtonDisabled(true);
  };

  const handleRejectInvitation = () => {
    rejectFriendInvitation(email);
  };

  return (
    <Tooltip title={email}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#8e9297",
              flexGrow: "1",
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonDisabled}
            acceptInvitation={handleAcceptInvitation}
            rejectInvitation={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
}

function mapActionsToProps(dispatch: AppDispatch) {
  return {
    ...friendsActions(dispatch),
  };
}

const connector = connect(null, mapActionsToProps);

type ReduxActions = ConnectedProps<typeof connector>;

export default connector(PendingInvitationsList);
