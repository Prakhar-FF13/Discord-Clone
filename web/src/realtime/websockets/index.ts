import { User } from "../../commonTypes";
// import { SetPendingInvitationsAction } from "../../store/actions/friendsActions";
import store from "../../store/store";

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket(`ws://localhost:4000/ws?email=${user.Email}`);

  conn.onmessage = (event: MessageEvent) => {
    let data = event.data;

    if (data) {
      data = JSON.parse(data);
      if (data && data.kind === "friend-invitations") {
        console.log(data.payload);
        // store.dispatch(SetPendingInvitationsAction(data));
      }
    }
  };
}
