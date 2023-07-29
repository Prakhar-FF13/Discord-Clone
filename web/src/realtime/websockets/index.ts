let conn: WebSocket;

export default function Websocket() {
  conn = new WebSocket("ws://localhost:4000/ws");

  conn.onmessage = (event) => {
    console.log(event);
  };
}
