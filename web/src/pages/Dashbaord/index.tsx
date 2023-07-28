import { styled } from "@mui/system";
import SideBar from "./Sidebar";
import FriendsSideBar from "./FriendsSideBar";
import Messenger from "./Messenger";
import AppBar from "./AppBar";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
