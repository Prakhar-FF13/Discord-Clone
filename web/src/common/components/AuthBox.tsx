import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { ReactElement, ReactNode } from "react";

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#5865F2",
});

type ChildrenPropAuthBox =
  | (ReactNode | ReactElement)[]
  | (ReactNode | ReactElement);

const AuthBox = (props: { children: ChildrenPropAuthBox }) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          width: 700,
          height: 400,
          backgroundColor: "#36393f",
          borderRadius: "5px",
          boxShadow: "2 2px 10px 0 rgb(0 0 0 / 20%)",
          display: "flex",
          flexDirection: "column",
          padding: "25px",
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default AuthBox;
