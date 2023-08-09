import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { Friends } from "../../../../commonTypes";

const MainContainer = styled("div")({
  flexGrow: "1",
  width: "100%",
});

function FriendsList({ friends }: Friends) {
  return (
    <MainContainer>
      {friends.map((f) => (
        <FriendsListItem
          username={f.username}
          key={f.id}
          isOnline={f.isOnline || false}
          id={f.id}
          email={f.email}
        />
      ))}
    </MainContainer>
  );
}

const mapStateToProps = ({ friends }: RootState) => {
  return {
    ...friends,
  };
};

export default connect(mapStateToProps, null)(FriendsList);
