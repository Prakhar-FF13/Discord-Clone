import { Box } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

export default function OnlineIndicator() {
  return (
    <Box
      sx={{
        color: "#3b855d",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5px",
      }}
    >
      <FiberManualRecord />
    </Box>
  );
}
