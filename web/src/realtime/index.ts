import {
  SetFriendIsOffline,
  SetFriendIsOnline,
  SetFriends,
  SetPendingInvitationsAction,
} from "../store/actions/friendsActions";
import { User, WebSocketMessageKind } from "../commonTypes";
import store from "../store/store";
import { setAMessage, setRoomMessages } from "../store/actions/chatActions";
import * as videoRoomHandler from "./videoRoomHandler";

interface Payload {
  kind: WebSocketMessageKind;
  payload: any;
}

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket(
    `ws://localhost:4000/ws?email=${user.Email}&id=${user.Id}&username=${user.Username}`
  );

  conn.onmessage = (event: MessageEvent) => {
    let dataString: string | null | undefined = event.data;

    if (dataString) {
      const data: Payload = JSON.parse(dataString);

      console.log(data);

      if (
        data &&
        data.kind === WebSocketMessageKind.FriendInvitations &&
        data.payload
      ) {
        store.dispatch(SetPendingInvitationsAction(data.payload));
      }

      if (data && data.kind === WebSocketMessageKind.Friends && data.payload) {
        store.dispatch(SetFriends(data.payload));
      }

      if (
        data &&
        data.kind === WebSocketMessageKind.FriendOnline &&
        data.payload
      ) {
        store.dispatch(SetFriendIsOnline(data.payload));
      }

      if (
        data &&
        data.kind === WebSocketMessageKind.FriendOffline &&
        data.payload
      ) {
        store.dispatch(SetFriendIsOffline(data.payload));
      }

      if (data && data.kind === WebSocketMessageKind.Message && data.payload) {
        store.dispatch(setAMessage(data.payload));
      }

      if (
        data &&
        data.kind === WebSocketMessageKind.RoomMessages &&
        data.payload
      ) {
        store.dispatch(setRoomMessages(data.payload));
      }

      if (data && data.kind === WebSocketMessageKind.VideoRoomCreate) {
        videoRoomHandler.newRoomCreated(data.payload);
      }
    }
  };
}

export const sendChangeRoom = (roomId: string) => {
  const data = JSON.stringify({
    kind: WebSocketMessageKind.RoomChange,
    payload: {
      roomId,
    },
  });

  sendWebsocketMessage(data);
};

export const sendChatMessage = (message: string) => {
  const data = JSON.stringify({
    kind: WebSocketMessageKind.Message,
    payload: {
      message,
      date: new Date(Date.now()).toUTCString(),
    },
  });

  sendWebsocketMessage(data);
};

export const sendVideoRoomCreateMessage = (roomLabel: string) => {
  const data = JSON.stringify({
    kind: WebSocketMessageKind.VideoRoomCreate,
    payload: { roomLabel },
  });

  sendWebsocketMessage(data);
};

export const sendJoinVideoRoomMessage = (roomId: string) => {
  const data = JSON.stringify({
    kind: WebSocketMessageKind.JoinVideoRoom,
    payload: { roomId },
  });

  sendWebsocketMessage(data);
};

export const sendWebsocketMessage = (data: string) => {
  conn.send(data);
};
