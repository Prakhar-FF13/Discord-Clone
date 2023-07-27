import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { connect } from "react-redux";

import { toastActions } from "../../store/actions/toastActions";
import { ToastType } from "../../commonTypes";
import { AppDispatch } from "../../store/store";

const Toast = ({
  showToastMessage,
  toastMessageContent,
  closeToast,
}: {
  toastMessageContent: string | null;
  showToastMessage: boolean;
  closeToast: () => void;
}) => {
  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToastMessage}
        onClose={() => {
          closeToast();
        }}
      >
        <Alert severity="info">{toastMessageContent}</Alert>
      </Snackbar>
    </>
  );
};

const mapStoreStateToProps = ({ toast }: { toast: ToastType }) => {
  return {
    ...toast,
  };
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...toastActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Toast);
