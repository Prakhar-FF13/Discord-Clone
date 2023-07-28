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

interface AddFriendDialogProps {
  isDialogOpen: boolean;
  closeDialogHandler: () => void;
  sendFriendInvitation: () => void;
}

export default function AddFriendDialog(props: AddFriendDialogProps) {
  const [mail, setMail] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleSendInvitation = () => {};

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
      </Dialog>
    </div>
  );
}
