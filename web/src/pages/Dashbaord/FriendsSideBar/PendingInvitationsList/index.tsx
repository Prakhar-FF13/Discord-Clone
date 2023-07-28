import { styled } from "@mui/system";
import PendingInvitationsList from "./PendingInvitationsList";

const DUMMY_INVITATIONS = [
  {
    id: 1,
    username: "Mark",
    email: "mark@gmail.com",
  },
  {
    id: 2,
    username: "Marky",
    email: "marky@gmail.com",
  },
];

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

export default function PendingInvitations() {
  return (
    <MainContainer>
      {DUMMY_INVITATIONS.map((inv) => (
        <PendingInvitationsList
          key={inv.id}
          username={inv.username}
          email={inv.email}
          id={inv.id}
          acceptFriendInvitation={() => {}}
          rejectFriendInvitation={() => {}}
        />
      ))}
    </MainContainer>
  );
}
