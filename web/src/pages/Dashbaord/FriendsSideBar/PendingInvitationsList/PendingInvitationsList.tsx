import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import Avatar from "../../../../common/components/Avatar";
import InvitationDecisionButtons from "./InvitationDecisionButtons";

interface PendingInvitationsListProps {
  username: string;
  email: string;
  acceptFriendInvitation: () => void;
  rejectFriendInvitation: () => void;
}

export default function PendingInvitationsList({
  username,
  email,
  acceptFriendInvitation,
  rejectFriendInvitation,
}: PendingInvitationsListProps) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleAcceptInvitation = () => {
    // acceptFriendInvitation({ id });
    setButtonDisabled(true);
  };

  const handleRejectInvitation = () => {
    // rejectFriendInvitation({ id });
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
