import { useState } from "react";
import { ChatDetails } from "../../../commonTypes";
import { ConnectedProps, connect } from "react-redux";
import { styled } from "@mui/material";

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
  chatDetails: ChatDetails;
}

const MessageInput = ({ chatDetails }: MessageInputProps) => {
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
    console.log("sending message to server");
    setMessage("");
  };

  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chatDetails.label}`}
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
