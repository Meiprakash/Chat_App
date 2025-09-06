import express from "express"
import "dotenv/config"
import cors from "cors"
import  DB  from "./DB/db.js"
import userRouter from "./Routes/userRoutes.js"
import MsgRouter from "./Routes/MessageROutes.js"
import http from "http";
import { Server, Socket } from "socket.io"
import { createServer } from "http"

const app = express()
const PORT = process.env.PORT || 5000
const server = http.createServer(app);


//init socket.io
export const io = new Server(server, {
    cors:{origin:"*"}
})


//store online users
export const userSocketMap = {}

//socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    console.log("User Connected", userId);

    if (userId) userSocketMap[userId] = socket.id
    
    //emit online users to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
    
})
app.use(express.json())
app.use(cors())
//get call
app.use("/api/status", (req, res) => {
    res.send("Server is live")
})
//for login , signup and auth.
app.use("/api/auth", userRouter)



//getting user for chatting
app.use("/api/message", MsgRouter)



server.listen(PORT, () => {
    console.log(`this server was running on ${PORT} PORT`);
    DB()
    
})