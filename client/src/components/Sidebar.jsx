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
      className={`relative h-full p-[3px] rounded-3xl overflow-hidden ${
        selectedUSer ? "max-md:hidden" : ""
      }`}
    >
      {/* Animated Border for Whole Sidebar */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-border"></div>

      {/* Sidebar Content */}
      <div
        className="relative bg-gradient-to-b from-[#1E1B3A] to-[#2C2B4B] backdrop-blur-lg 
      h-full p-5 rounded-3xl overflow-y-scroll text-white shadow-lg z-10"
      >
        {/* Top Section: Logo and Menu */}
        <div className="pb-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <img
              src="yoyo-logo.png"
              alt="logo"
              className="w-12 h-12 object-contain rounded-full shadow-md"
            />

            {/* Menu Dropdown */}
            <div className="relative py-2 group">
              <img
                src={assets.menu_icon}
                alt="Menu"
                className="w-6 cursor-pointer hover:scale-110 transition-transform"
              />
              <div
                className="absolute top-full right-0 z-20 w-36 p-3 rounded-lg 
              bg-[#2F2B48]/90 border border-gray-700 shadow-xl hidden group-hover:block"
              >
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm hover:text-blue-400 transition-colors"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-gray-600" />
                <p
                  onClick={() => logout()}
                  className="cursor-pointer text-sm hover:text-red-400 transition-colors"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="bg-[#2F2B48] mt-6 rounded-full flex items-center gap-3 px-4 py-3 
          shadow-inner border border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
          >
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-4 opacity-70"
            />
            <input
              type="text"
              onChange={(e) => setinput(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white 
            placeholder-gray-400 flex-1"
              placeholder="Search User..."
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex flex-col mt-4 gap-3">
          {filterUsers.map((user, index) => (
            <div
              key={index}
              onClick={() => setselectedUser(user)}
              className={`relative p-[2px] rounded-xl transition-transform duration-300 ease-in-out cursor-pointer
            ${
              selectedUSer?._id === user._id
                ? "scale-[1.02]"
                : "hover:scale-[1.01]"
            }`}
            >
              {/* Animated Border for Each Chat */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-border"></div>

              {/* Chat Content */}
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2F2B48] 
              ${
                selectedUSer?._id === user._id
                  ? "bg-opacity-90 shadow-lg"
                  : "bg-opacity-70"
              }`}
              >
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={user?.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-cover shadow-md border border-gray-700"
                  />
                  {/* Online Indicator */}
                  {onlineUser.includes(user._id.toString()) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border border-gray-800 rounded-full"></span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex flex-col leading-5">
                  <p className="font-medium text-gray-100">{user.fullname}</p>
                  <span
                    className={`text-xs ${
                      onlineUser.includes(user._id.toString())
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    {onlineUser.includes(user._id.toString())
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>

                {/* Unseen Message Badge */}
                {unseenMsg[user._id] > 0 && (
                  <p
                    className="absolute top-3 right-4 text-xs h-6 w-6 flex justify-center items-center 
                rounded-full bg-red-500 text-white font-semibold shadow-md"
                  >
                    {unseenMsg[user._id]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
