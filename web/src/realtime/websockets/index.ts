import { User } from "../../commonTypes";
// import { SetPendingInvitationsAction } from "../../store/actions/friendsActions";
import store from "../../store/store";

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket(`ws://localhost:4000/ws?email=${user.Email}`);

  conn.onmessage = (event: MessageEvent) => {
    if (event.data && event.data.kind === "friend-invitations") {
      const data = JSON.parse(event.data);
      console.log(data);
      // store.dispatch(SetPendingInvitationsAction(data));
    }
  };
}
