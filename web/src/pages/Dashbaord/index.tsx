import { styled } from "@mui/system";
import SideBar from "./Sidebar";
import FriendsSideBar from "./FriendsSideBar";
import Messenger from "./Messenger";
import AppBar from "./AppBar";
import { useEffect } from "react";
import { User } from "../../commonTypes";
import { logout } from "../../common/utils/auth";
import { getActions } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { AppDispatch } from "../../store/store";

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
  useEffect(() => {
    const userDetails: string | null = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      const user: User = JSON.parse(userDetails);
      setUserDetails(user);
    }
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Dashboard);
