import { Typography, styled } from "@mui/material";

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Welcome = () => {
  return (
    <Wrapper>
      <Typography
        variant="h6"
        sx={{
          color: "white",
        }}
      >
        To start chatting choose conversation
      </Typography>
    </Wrapper>
  );
};

export default Welcome;
