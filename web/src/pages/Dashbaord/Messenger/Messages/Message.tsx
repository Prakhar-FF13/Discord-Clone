import { Typography, styled } from "@mui/material";
import Avatar from "../../../../common/components/Avatar";

const MainContainer = styled("div")({
  width: "90%",
  display: "flex",
  marginTop: "10px",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MessageContent = styled("div")({
  color: "#DCDDDE",
});

interface MessageProps {
  email: string;
  username: string;
  message: string;
  date: string;
}

const Message = ({ username, message, date }: MessageProps) => {
  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar username={username} />
      </AvatarContainer>
      <MessageContainer>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
          }}
        >
          {username}{" "}
          <span style={{ fontSize: "12px", color: "#72767d" }}>{date}</span>
        </Typography>
        <MessageContent>{message}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

export default Message;
