import app from "./app.js";
import { connectdb } from "./db/connectdb.js";
import { Server } from "socket.io";
import { createServer } from "http";
connectdb();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

const onlineUsers = new Map(); // Use a Map to track username -> socket.id pairs

io.on("connection", (socket) => {
    socket.on("setupuser", (username) => {
        onlineUsers.set(username, socket.id);
        io.emit("onlineusers", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
        for (let [username, id] of onlineUsers) {
            if (id === socket.id) {
                onlineUsers.delete(username);
                break;
            }
        }

        // Emit updated list
        io.emit("onlineusers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendmessage", ({ reciver,sender, message }) => {
        const recipientSocketId = onlineUsers.get(reciver); 
            socket.to(recipientSocketId).emit("recivemessage", { sender, message });
    });

});

server.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});
