import { User } from "../../commonTypes";
// import { SetPendingInvitationsAction } from "../../store/actions/friendsActions";
import store from "../../store/store";

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket(`ws://localhost:4000/ws?email=${user.Email}`);

  if (conn.readyState === WebSocket.OPEN) {
    conn.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      // store.dispatch(SetPendingInvitationsAction(data));
    };
  }
}
