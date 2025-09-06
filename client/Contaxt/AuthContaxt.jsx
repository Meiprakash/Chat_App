import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContaxt = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setonlineUser] = useState([]);
  const [socket, setSocket] = useState(null);

  //check if user is authenticated
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        toast.error(data.message || "Not authenticated");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //login function to handle user authentication and socket connection
  const login = async (state, credential) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credential); //changed place
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; //changed place
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message); //changed
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //logout

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setonlineUser([]);
    axios.defaults.headers.common["Authorization"] = null; //["token"] = null;
    toast.success("Logged out successfully");
    socket.disconnect();
  };

  //update
  const updataProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //connect socket func to handle socket connection and online users updates
  // const connectSocket = (userdata) => {
  //   if (!userdata || socket?.connected) return;
  //   const newSocket = io(backendUrl, {
  //     query: {
  //       userId: userdata._id,
  //     },
  //   });
  //   newSocket.on("getOnlineUsers", (userIds) => {
  //     setonlineUser(userIds);
  //   });
  // };

  //gpt code
  const connectSocket = (userdata) => {
    if (!userdata) return;

    // disconnect old socket if exists
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(backendUrl, {
      query: { userId: userdata._id },
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setonlineUser(userIds);
    });

    // save socket in state
    setSocket(newSocket);
  };

  //   useEffect(() => {
  //     if (token) {
  //       axios.defaults.headers.common["token"] = token;
  //     }
  //     checkAuth();
  //   }, []);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      checkAuth();
    }
  }, []);

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,
    logout,
    updataProfile,
  };

  return <AuthContaxt.Provider value={value}>{children}</AuthContaxt.Provider>;
};
export default AuthContaxt;
