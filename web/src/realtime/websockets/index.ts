import {
  SetFriendIsOffline,
  SetFriendIsOnline,
  SetFriends,
  SetPendingInvitationsAction,
} from "./../../store/actions/friendsActions";
import { User, WebSocketResponse } from "../../commonTypes";
import store from "../../store/store";

interface Payload {
  kind: WebSocketResponse;
  payload: any;
}

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket(
    `ws://localhost:4000/ws?email=${user.Email}&id=${user.Id}`
  );

  conn.onmessage = (event: MessageEvent) => {
    let dataString: string | null | undefined = event.data;

    if (dataString) {
      const data: Payload = JSON.parse(dataString);

      console.log(data);

      if (data && data.kind === "friend-invitations" && data.payload) {
        store.dispatch(SetPendingInvitationsAction(data.payload));
      }

      if (data && data.kind === "friends" && data.payload) {
        store.dispatch(SetFriends(data.payload));
      }

      if (data && data.kind === "friend-online" && data.payload) {
        store.dispatch(SetFriendIsOnline(data.payload));
      }

      if (data && data.kind === "friend-offline" && data.payload) {
        store.dispatch(SetFriendIsOffline(data.payload));
      }
    }
  };
}

export const sendChangeRoom = (roomId: string) => {
  const data = JSON.stringify({
    kind: "room-change",
    payload: {
      roomId,
    },
  });

  sendWebsocketMessage(data);
};

export const sendDirectChatMessage = (roomId: string, message: string) => {
  const data = JSON.stringify({
    kind: "direct-chat-message",
    payload: {
      roomId,
      message,
      date: new Date(Date.now()).toDateString(),
    },
  });

  sendWebsocketMessage(data);
};

export const sendWebsocketMessage = (data: string) => {
  conn.send(data);
};
