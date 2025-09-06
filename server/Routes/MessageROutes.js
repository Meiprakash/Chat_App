import express from "express"
import { protectRoute } from "../Middleware/auth.js"
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../Controllers/MessageController.js"

const MsgRouter = express.Router()

MsgRouter.get("/users",protectRoute , getUsersForSidebar)
MsgRouter.get("/:id", protectRoute, getMessages)
MsgRouter.put("/mark/:id", protectRoute, markMessageAsSeen)
MsgRouter.post("/send/:id", protectRoute , sendMessage)

export default MsgRouter 