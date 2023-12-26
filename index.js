const express = require("express");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const { AceBase } = require("acebase");
const db = new AceBase("my_db");
db.ready(() => {
  // The database is now ready to use
  console.log("Database is ready");
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Chat Universe!</h1>");
});

io.on("connection", (socket) => {
  socket.on("join room", async (room) => {
    socket.join(room);

    // Retrieve messages from AceBase
    try {
      const messagesRef = db.ref(`rooms/${room}/messages`);
      const messagesSnap = await messagesRef.get();
      let messages = messagesSnap.val() || {};
      messages = Object.values(messages);
      messages.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      console.log(messages);
      socket.emit("load old messages", messages);
    } catch (err) {
      console.error(err);
    }
  });

  // The client-side event "load old messages" should be handled on the client, not here

  socket.on("chat message", (data) => {
    // Save new message to AceBase
    const messagesRef = db.ref(`rooms/${data.room}/messages`);
    messagesRef.push(data).then(() => {
      io.to(data.room).emit("chat message", data);
    });
  });

  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
