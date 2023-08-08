import { Typography, styled } from "@mui/material";
import Avatar from "../../../../common/components/Avatar";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ label }: { label: string }) => {
  return (
    <MainContainer>
      <Avatar large username={label} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: "#b9bbbe",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        This is the beginning of your conversation with {label}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
