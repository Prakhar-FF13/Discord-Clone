import { useState } from "react";
import PrimaryButton from "../../../common/components/PrimaryButton";
import AddFriendDialog from "./AddFriendDialog";

export default function AddFriendButton() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <PrimaryButton
        label="Add Friend"
        additionalStyles={{
          marginTop: "10px",
          marginLeft: "5px",
          width: "80%",
          height: "30px",
          background: "#3ba55d",
        }}
        disabled={false}
        onClick={handleOpenAddFriendDialog}
      />
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
        sendFriendInvitation={() => {}}
      />
    </>
  );
}
