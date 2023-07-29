export default function Websocket() {
  let conn = new WebSocket("ws://localhost:4000/ws", "echo-protocol");
}
