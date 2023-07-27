import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Toast = ({
  message = "",
  severity = "info",
}: {
  message?: string;
  severity?: "info" | "error" | "warning" | "success";
}) => {
  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open
        onClose={() => {}}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
