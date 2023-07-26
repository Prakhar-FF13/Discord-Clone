import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const RedirectText = styled("span")({
  color: "#00AFF4",
  fontWeight: 500,
  cursor: "pointer",
});

interface RedirectInfoProps {
  text: string;
  redirectText: string;
  additionalStyles?: {
    [key: string]: string | number;
  };
  redirectHandler: () => void;
}

const RedirectInfo = ({
  text,
  redirectText,
  additionalStyles,
  redirectHandler,
}: RedirectInfoProps) => {
  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{ color: "#72767d" }}
        style={additionalStyles ? additionalStyles : {}}
      >
        {text}
        <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
      </Typography>
    </>
  );
};

export default RedirectInfo;
