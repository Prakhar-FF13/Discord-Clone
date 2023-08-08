import { styled } from "@mui/material";
import { ChatDetails } from "../../../commonTypes";
import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

interface MessengerContentProps {
  chatDetails: ChatDetails;
}

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chatDetails }: MessengerContentProps) => {
  useEffect(() => {
    // Todo fetching chat history from spaceific user id
  }, [chatDetails]);

  return (
    <Wrapper>
      <Messages />
      <MessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
