import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";

const DUMMY_FRIENDS = [
  {
    id: 1,
    username: "Mark",
    isOnline: true,
  },
  {
    id: 2,
    username: "Marky",
    isOnline: false,
  },
  {
    id: 3,
    username: "Damn",
    isOnline: true,
  },
];

const MainContainer = styled("div")({
  flexGrow: "1",
  width: "100%",
});

export default function FriendsList() {
  return (
    <MainContainer>
      {DUMMY_FRIENDS.map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
}
