import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InputWithLabels from "../../../../common/components/InputWithLabels";
import PrimaryButton from "../../../../common/components/PrimaryButton";
import * as roomHandler from "../../../../realtime/videoRoomHandler";

interface RoomModalProps {
  isDialogOpen: boolean;
  closeDialogHandler: () => void;
}

function RoomModal({ isDialogOpen, closeDialogHandler }: RoomModalProps) {
  const [roomLabel, setRoomLabel] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const createNewRoomHandler = () => {
    roomHandler.createNewRoom(roomLabel);
  };

  const joinVideoRoomHandler = () => {
    roomHandler.joinVideoRoom(roomId);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={closeDialogHandler}>
        <DialogTitle>
          <Typography>Create or join a room</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Enter room label to create a new room</Typography>
          </DialogContentText>
          <InputWithLabels
            label="Label"
            type="text"
            placeholder="Enter room label"
            value={roomLabel}
            setValue={setRoomLabel}
          />
          <br />
          <DialogContentText>
            <Typography>Enter room id to join a room</Typography>
          </DialogContentText>
          <InputWithLabels
            label="RoomId"
            type="text"
            placeholder="Enter room id"
            value={roomId}
            setValue={setRoomId}
          />
        </DialogContent>
        <DialogActions>
          <PrimaryButton
            onClick={createNewRoomHandler}
            disabled={!roomLabel || roomLabel.length === 0}
            label="Create"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
          <PrimaryButton
            onClick={joinVideoRoomHandler}
            disabled={!roomId || roomId.length === 0}
            label="Join Room"
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
}

export default RoomModal;
