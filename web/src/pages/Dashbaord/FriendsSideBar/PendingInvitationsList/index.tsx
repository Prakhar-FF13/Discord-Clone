import { styled } from "@mui/system";
import PendingInvitationsList from "./PendingInvitationsList";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { Friend, Friends } from "../../../../commonTypes";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

function PendingInvitations({ pendingFriendsInvitations }: Friends) {
  return (
    <MainContainer>
      {pendingFriendsInvitations.map((inv: Friend) => (
        <PendingInvitationsList
          key={inv.id}
          username={inv.username}
          email={inv.email}
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

export default connect(mapStateToProps, null)(PendingInvitations);
