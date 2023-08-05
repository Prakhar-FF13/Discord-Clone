import { SetPendingInvitationsAction } from "./../../store/actions/friendsActions";
import { Friend, User, WebSocketResponse } from "../../commonTypes";
import store from "../../store/store";

interface Payload {
  kind: WebSocketResponse;
  payload: Friend[];
}

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket(`ws://localhost:4000/ws?email=${user.Email}`);

  conn.onmessage = (event: MessageEvent) => {
    let dataString: string | null | undefined = event.data;

    if (dataString) {
      const data: Payload = JSON.parse(dataString);

      console.log(data);

      if (data && data.kind === "friend-invitations" && data.payload) {
        store.dispatch(SetPendingInvitationsAction(data.payload));
      }

      if (data && data.kind === "friends" && data.payload) {
      }
    }
  };
}
