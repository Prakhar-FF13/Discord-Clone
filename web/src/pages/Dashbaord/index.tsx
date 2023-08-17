import { styled } from "@mui/system";
import SideBar from "./Sidebar";
import FriendsSideBar from "./FriendsSideBar";
import Messenger from "./Messenger";
import AppBar from "./AppBar";
import { useContext, useEffect, useReducer } from "react";
import { User } from "../../commonTypes";
import { logout } from "../../common/utils/auth";
import { getActions } from "../../store/actions/authActions";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch } from "../../store/store";
import Websocket from "../../realtime";
import VideoRoom from "./VideoRoom";
import videoReducer, {
  VideoContext,
  initState,
} from "../../store/reducers/videoReducer";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = ({
  setUserDetails,
}: {
  setUserDetails: (userDetails: User) => void;
}) => {
  const { videoState, setVideoState } = useContext(VideoContext);

  console.log(videoState);

  useEffect(() => {
    const userDetails: string | null = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      const user: User = JSON.parse(userDetails);
      setUserDetails(user);
      Websocket(user, setVideoState);
    }
  }, [setUserDetails, setVideoState]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {videoState.isUserInRoom && <VideoRoom />}
    </Wrapper>
  );
};

const DashboardWrapper = ({ setUserDetails }: FromRedux) => {
  const [videoState, setVideoState] = useReducer(videoReducer, initState);

  return (
    <VideoContext.Provider value={{ videoState, setVideoState }}>
      <Dashboard setUserDetails={setUserDetails} />
    </VideoContext.Provider>
  );
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const connector = connect(null, mapActionsToProps);

type FromRedux = ConnectedProps<typeof connector>;

export default connector(DashboardWrapper);
