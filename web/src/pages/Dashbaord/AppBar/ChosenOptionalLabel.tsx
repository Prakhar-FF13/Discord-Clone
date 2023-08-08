import { Typography } from "@mui/material";
import { RootState } from "../../../store/store";
import { ConnectedProps, connect } from "react-redux";

interface ChosenOptionLabelProps extends ReduxState {}

const ChosenOptionLabel = ({ label }: ChosenOptionLabelProps) => {
  return (
    <Typography
      sx={{
        fontSize: "16px",
        color: "white",
        fontWeight: "bold",
      }}
    >{`${label ? label : ""}`}</Typography>
  );
};

const mapStateToProps = ({ chat }: RootState) => {
  return {
    label: chat.chatDetails?.label,
  };
};

const connector = connect(mapStateToProps, null);

type ReduxState = ConnectedProps<typeof connector>;

export default connector(ChosenOptionLabel);
