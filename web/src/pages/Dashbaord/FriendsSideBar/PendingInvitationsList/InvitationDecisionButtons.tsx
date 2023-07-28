import { Check, Clear } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface InvitationDecisionButtonProps {
  disabled: boolean;
  acceptInvitation: () => void;
  rejectInvitation: () => void;
}

export default function InvitationDecisionButtons({
  disabled,
  acceptInvitation,
  rejectInvitation,
}: InvitationDecisionButtonProps) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={acceptInvitation}
      >
        <Check />
      </IconButton>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={rejectInvitation}
      >
        <Clear />
      </IconButton>
    </Box>
  );
}
