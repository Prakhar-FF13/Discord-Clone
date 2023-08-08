import { Typography } from "@mui/material";
import { RootState } from "../../../store/store";
import { ConnectedProps, connect } from "react-redux";

interface ChosenOptionLabelProps extends ReduxState {}

const ChosenOptionLabel = ({ username }: ChosenOptionLabelProps) => {
  return (
    <Typography
      sx={{
        fontSize: "16px",
        color: "white",
        fontWeight: "bold",
      }}
    >{`${username ? username : ""}`}</Typography>
  );
};

const mapStateToProps = ({ chat }: RootState) => {
  return {
    username: chat.chatDetails?.username,
  };
};

const connector = connect(mapStateToProps, null);

type ReduxState = ConnectedProps<typeof connector>;

export default connector(ChosenOptionLabel);
