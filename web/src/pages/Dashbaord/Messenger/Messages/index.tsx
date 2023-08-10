import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { styled } from "@mui/material";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Messages = ({ chatLabel, messages }: ReduxChatState) => {
  return (
    <MainContainer>
      <MessagesHeader label={chatLabel ? chatLabel : ""} />
      {messages.map((msg) => {
        return (
          <Message
            key={msg.date}
            message={msg.message}
            email={msg.email}
            username={msg.username}
            date={msg.date}
          />
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }: RootState) => {
  return {
    ...chat,
  };
};

const connector = connect(mapStoreStateToProps, null);

type ReduxChatState = ConnectedProps<typeof connector>;

export default connector(Messages);
