import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import RoomModal from "./RoomModal";

const CreateRoomButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenRoomModal = () => {
    setIsDialogOpen(true);
  };

  const handleCloseRoomModal = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenRoomModal}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "16px",
          margin: 0,
          padding: 0,
          minWidth: 0,
          marginTop: "10px",
          color: "white",
          backgroundColor: "#5865F2",
        }}
      >
        <AddIcon />
      </Button>
      <RoomModal
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseRoomModal}
      />
    </>
  );
};

export default CreateRoomButton;
