import { createContext, useContext, useEffect, useState } from "react";
import AuthContaxt from "../../Contaxt/AuthContaxt.jsx";
import toast from "react-hot-toast";

export  const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [message, setmessage] = useState([]);
  const [users, setusers] = useState([]); //this is the left side user list.
  const [selectedUSer, setselectedUser] = useState(null);
  const [unseenMsg, setunseenMsg] = useState({});

  const { socket, axios } = useContext(AuthContaxt);

  //get user for sidebar
  const getUsers = async () => {
    try {
     const {data}=  await axios.get("/api/message/users");

      if (data.success) {
        setusers(data.users);
        setunseenMsg(data.unseenMsg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function get selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/message/${userId}`);
      if (data.success) {
        setmessage(data.message || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to send msg to user
  const sendMessage = async (messageData) => {
    try {
      if (!selectedUSer) return;

      const token = localStorage.getItem("token"); // get token

      const { data } = await axios.post(
        `/api/message/send/${selectedUSer._id}`,
        messageData, {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );
      if (data.success) {
        setmessage((prev) => [...prev, data.newmessage]);
        console.log(data.newmessage);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //function to when you are in chat(subscribe)
  const subscribeToMsg = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUSer && newMessage.senderId === selectedUSer._id) {
        newMessage.seen = true;
        setmessage((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setunseenMsg((prevUnseenMsg) => ({
          ...prevUnseenMsg,
          [newMessage.senderId]: prevUnseenMsg[newMessage.senderId]
            ? prevUnseenMsg[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  //function to unsubscirbe
  const unsubscirbeFromMessages = () => {
    if (socket) socket.off("newMessages");
  };

  useEffect(() => {
    subscribeToMsg();
    return () => unsubscirbeFromMessages();
  }, [socket, selectedUSer]);

  const value = {
    message,
    users,
    selectedUSer,
    getUsers,
    setmessage,
    sendMessage,
    setselectedUser,
    unseenMsg,
    setunseenMsg,
    getMessages,
  };
  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};
