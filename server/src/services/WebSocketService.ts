import { Server } from "socket.io";

export class WebSocketService {
  constructor(httpServer: any) {
    const io = new Server(httpServer);

    io.on("connection", socket => {
      socket.on("picker-moved", data => {
        io.emit("picker-update", data);
      });
    });
  }
}
