import { styled } from "@mui/material";
import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

interface MessengerContentProps {
  roomId: string;
}

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ roomId }: MessengerContentProps) => {
  useEffect(() => {
    // Todo fetching chat history from spaceific user id
  }, [roomId]);

  return (
    <Wrapper>
      <Messages />
      <MessageInput roomId={roomId} />
    </Wrapper>
  );
};

export default MessengerContent;
