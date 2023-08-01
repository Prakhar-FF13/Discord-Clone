import { User } from "../../commonTypes";

let conn: WebSocket;

export default function Websocket(user: User) {
  conn = new WebSocket("ws://localhost:4000/ws");

  conn.onopen = (event) => {
    console.log(event);
  };
}
