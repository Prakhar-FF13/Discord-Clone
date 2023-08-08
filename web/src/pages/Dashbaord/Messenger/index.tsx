import { styled } from "@mui/system";
import { RootState } from "../../../store/store";
import { connect, ConnectedProps } from "react-redux";
import Welcome from "./Welcome";
import MessengerContent from "./MessengerContent";

const MainContainer = styled("div")({
  flexGrow: 1,
  display: "flex",
  backgroundColor: "#36393f",
  marginTop: "48px",
});

function Messenger({ chatDetails }: ReduxState) {
  return (
    <MainContainer>
      {!chatDetails ? (
        <Welcome />
      ) : (
        <MessengerContent chatDetails={chatDetails} />
      )}
    </MainContainer>
  );
}

const mapStoreStateToProps = ({ chat }: RootState) => {
  return {
    ...chat,
  };
};

const connector = connect(mapStoreStateToProps, null);

type ReduxState = ConnectedProps<typeof connector>;

export default connector(Messenger);
