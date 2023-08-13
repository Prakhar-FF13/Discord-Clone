import { styled } from "@mui/system";
import SideBar from "./Sidebar";
import FriendsSideBar from "./FriendsSideBar";
import Messenger from "./Messenger";
import AppBar from "./AppBar";
import { useEffect } from "react";
import { User } from "../../commonTypes";
import { logout } from "../../common/utils/auth";
import { getActions } from "../../store/actions/authActions";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Websocket from "../../realtime";
import VideoRoom from "./VideoRoom";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = ({ setUserDetails, isUserInRoom }: FromRedux) => {
  useEffect(() => {
    const userDetails: string | null = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      const user: User = JSON.parse(userDetails);
      setUserDetails(user);
      Websocket(user);
    }
  }, [setUserDetails]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <VideoRoom />}
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    ...state.video,
  };
};

const connector = connect(mapStateToProps, mapActionsToProps);

type FromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
