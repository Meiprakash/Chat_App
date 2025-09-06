import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/chat-app-assets/assets";
import { useNavigate } from "react-router-dom";
import Profile from "../Routes/Profile.jsx";
import AuthContaxt from "../../Contaxt/AuthContaxt.jsx";
import { ChatContext } from "../contaxt/chatContext.jsx";

const Sidebar = () => {

  const {
    getUsers,
    users,
    selectedUSer,
    setselectedUser,
    unseenMsg,
    setunseenMsg,
  } = useContext(ChatContext);

  const { logout, onlineUser } = useContext(AuthContaxt)
  const [input, setinput] = useState(false)


  const filterUsers = input ? users.filter((user)=>user.fullname.toLowerCase().includes(input.toLowerCase())) : users

  useEffect(() => {
    getUsers()
    console.log("👉 Online users array from context:", onlineUser);
},[onlineUser])
  const navigate = useNavigate();
  return (
    // <div
    //   className={`bg-[#8185B2]/10 h-full p-5 rounded-r-3xl overflow-y-scroll  text-white ${
    //     selectedUSer ? "max-md:hidden" : ""
    //   }`}
    // >
    //   <div className="pb-5">
    //     <div className="flex justify-between items-center">
    //       <img src="yoyo-logo.png" alt="logo" className="max-w-10" />
    //       <div className="relative py-2 group">
    //         <img
    //           src={assets.menu_icon}
    //           alt="Menu"
    //           className="max-h-5 cursor-pointer"
    //         />
    //         <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
    //           <p
    //             onClick={() => navigate("/profile")}
    //             className="cursor-pointer text:sm"
    //           >
    //             Edit Profile
    //           </p>
    //           <hr className="my-2 border-t border-gray-500" />
    //           <p onClick={() => logout()} className="cursor-pointer text:sm">
    //             Logout
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
    //       <img src={assets.search_icon} alt="Search" className="w-3" />
    //       <input
    //         type="text"
    //         onChange={(e) => setinput(e.target.value)}
    //         className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
    //         placeholder="Search User"
    //       />
    //     </div>
    //   </div>
    //   <div className="flex flex-col">
    //     {filterUsers.map((user, index) => (
    //       <div
    //         key={index}
    //         onClick={() => setselectedUser(user)}
    //         className={`relative flex items-center gap-2 p-2 pl-4 cursor-pointer rounded max-sm:text-sm ${
    //           selectedUSer?._id === user._id && "bg-[#282142]/50"
    //         }`}
    //       >
    //         <img
    //           src={user?.profilePic || assets.avatar_icon}
    //           alt=""
    //           className="w-[35px] aspect-[1/1] rounded-full"
    //         />
    //         <div className="flex flex-col leading-5">
    //           <p className="text-gray-800">{user.fullname}</p>
    //           {onlineUser.includes(user._id.toString()) ? (
    //             <span className="text-blue-500 text-sm">Online</span>
    //           ) : (
    //             <span className="text-red-500 text-sm">Offline</span>
    //           )}
    //         </div>
    //         {unseenMsg[user._id] > 0 && (
    //           <p className="absolute top-4 right-4 text-sm h-6 w-6 flex justify-center items-center rounded-full bg-blue-400 text-blue-900">
    //             {unseenMsg[user._id]}
    //           </p>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div
      className={`bg-gradient-to-b from-teal-500 via-cyan-600 to-blue-800 h-full p-5 rounded-r-3xl overflow-y-scroll text-white shadow-xl transition-all duration-300 ${
        selectedUSer ? "max-md:hidden" : ""
      }`}
    >
      {/* Logo & Menu */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="yoyo-logo.png"
              alt="logo"
              className="w-10 rounded-full shadow-lg"
            />
            <p className="text-lg font-bold tracking-wide">YoYo</p>
          </div>

          {/* Menu Dropdown */}
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="w-6 h-6 cursor-pointer hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute top-full right-0 mt-2 z-20 w-36 p-4 rounded-xl bg-gray-900/90 backdrop-blur-lg border border-gray-700 text-gray-100 hidden group-hover:block shadow-md">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm hover:text-blue-400 transition-colors duration-200"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-gray-600" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm hover:text-red-400 transition-colors duration-200"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-900/80 rounded-full flex items-center gap-3 py-3 px-4 mt-5 border border-gray-700 shadow-inner">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 opacity-80"
          />
          <input
            type="text"
            onChange={(e) => setinput(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 flex-1"
            placeholder="Search User"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col space-y-3">
        {filterUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => setselectedUser(user)}
            className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 
          ${
            selectedUSer?._id === user._id
              ? "bg-blue-700/60 shadow-lg scale-[1.02]"
              : "hover:bg-gray-900/30"
          }`}
          >
            {/* Avatar */}
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />

            {/* Name & Status */}
            <div className="flex flex-col leading-5">
              <p className="text-gray-100 font-medium">{user.fullname}</p>
              {onlineUser.includes(user._id.toString()) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-red-400 text-xs">Offline</span>
              )}
            </div>

            {/* Unread Messages Badge */}
            {unseenMsg[user._id] > 0 && (
              <span className="absolute top-2 right-3 text-xs h-6 w-6 flex justify-center items-center rounded-full bg-blue-400 text-blue-900 font-bold shadow-md">
                {unseenMsg[user._id]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
