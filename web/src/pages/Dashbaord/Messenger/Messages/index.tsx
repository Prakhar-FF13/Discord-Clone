import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { styled } from "@mui/material";
import MessagesHeader from "./MessagesHeader";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Messages = ({ chatDetails, messages }: ReduxChatState) => {
  return (
    <MainContainer>
      <MessagesHeader label={chatDetails ? chatDetails.label : ""} />
      {DUMMY_MESSAGES.map((msg, idx) => {
        return (
          <Message
            key={msg.id}
            content={msg.content}
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
