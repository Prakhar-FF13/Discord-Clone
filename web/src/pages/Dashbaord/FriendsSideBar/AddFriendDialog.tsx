import { useState, useEffect } from "react";
import { validateEmail } from "../../../common/utils/validators";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import InputWithLabels from "../../../common/components/InputWithLabels";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { connect } from "react-redux";
import { friendsActions } from "../../../store/actions/friendsActions";
import { AppDispatch } from "../../../store/store";

interface AddFriendDialogProps {
  isDialogOpen: boolean;
  closeDialogHandler: () => void;
  sendFriendInvitation: (data: string, handler: () => void) => void;
}

const AddFriendDialog = (props: AddFriendDialogProps) => {
  const [mail, setMail] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleSendInvitation = () => {
    props.sendFriendInvitation(mail, props.closeDialogHandler);
  };

  const handleCloseDialog = () => {
    props.closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateEmail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={props.isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Enter e-mail address of friend</Typography>
          </DialogContentText>
          <InputWithLabels
            label="Email"
            type="text"
            placeholder="Enter email"
            value={mail}
            setValue={setMail}
          />
        </DialogContent>
        <DialogActions>
          <PrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send Invite"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...friendsActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AddFriendDialog);
