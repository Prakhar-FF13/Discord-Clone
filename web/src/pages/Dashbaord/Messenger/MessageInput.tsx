import { useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { styled } from "@mui/material";
import { sendDirectChatMessage } from "../../../realtime/websockets";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2f3136",
  width: "98%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

interface MessageInputProps extends ReduxState {
  roomId: string;
}

const MessageInput = ({ roomId }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleMessageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    setMessage("");

    if (message.length > 0) {
      sendDirectChatMessage(roomId, message);
    }
  };

  return (
    <MainContainer>
      <Input
        placeholder="Write message"
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPress}
      />
    </MainContainer>
  );
};

const connector = connect();

type ReduxState = ConnectedProps<typeof connector>;

export default connector(MessageInput);
