import userModel from "../Models/userSchema.js";
import messageModel from "../Models/MessageSchema.js";
import cloudinary from "../cloudnery.js";
import { io,userSocketMap } from "../server.js";

//get all users but new logginers illa

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: userId } })
      .select("-password");

    //count no of unseen
    const unseenMsg = {};
    const promises = filteredUsers.map(async (user) => {
      const msg = await messageModel.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messageModel.length > 0) {
        unseenMsg[user._id] = messageModel.length;
      }
    });
    await Promise.all(promises);
    res.json({ success: true, users: filteredUsers, unseenMsg });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

//Get all msg for Selected user

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserID } = req.params; //user 1
    //user 2
    const myId = req.user._id; //inb this place req.user means its fetch the full user data into request object.

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: selectedUserID }, //user 1
        { senderId: selectedUserID, receiverId: myId }, //user 2
      ],
    });

    await messageModel.updateMany(
      { senderId: selectedUserID, receiverId: myId },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

//api to mark message as seen using message id
export const markMessageAsSeen = async (Request, res) => {
  try {
    const { id } = req.params;
    await messageModel.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.messag });
  }
};

//send message to slected user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newmessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image:imageUrl
    });
    //send back toi the creted msg
    res.status(200).json({
      success:true,newmessage
    })
      
      //Emmit the new message to the receiver's socket
      const receiverSocketId = userSocketMap[receiverId]
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage",newmessage)
      }
      
      // res.json({success:true, newmessage})
      
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.messag });
  }
};
