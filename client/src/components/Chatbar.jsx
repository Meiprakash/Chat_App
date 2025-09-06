// import React, { useContext, useEffect, useRef, useState } from "react";
// import assets, { messagesDummyData } from "../assets/chat-app-assets/assets";
// import { formatMessageTime } from "../lib/utils";
// import { ChatContext } from "../contaxt/chatContext.jsx";
// import AuthContaxt from "../../Contaxt/AuthContaxt.jsx";

// function Chatbar() {


//   const { message, selectedUSer, setselectedUser, sendMessage, getMessages } =
//     useContext(ChatContext);
//   const { authUser, onlineUser } = useContext(AuthContaxt);

//   const scrollEnd = useRef()

//   const[input , setInput] = useState('')

//   //handlesend messgage

//   const handleSendMessage = async (e) => {
//     e.preventDefault()
//     if (input.trim() === " ") return null;
//     await sendMessage({ text: input.trim() })
//     setInput("")

//   }

//   useEffect(() => {
//     if (selectedUSer) {
//       getMessages(selectedUSer._id)
//     }
//   },[selectedUSer])


//   useEffect(() => {
//     if (scrollEnd.current && message) {
//       scrollEnd.current.scrollIntoView({behavior : "smooth"})
//     }
//   },[message])

//   return selectedUSer ? (
//     <div className="h-full overflow-scroll relative backdrop-blur-lg">
//       {/* heading */}
//       <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
//         <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
//         <p className="flex-1 text-lg text-white flex items-center gap-2">
//           {selectedUSer.fullname}
//           {onlineUser.includes(selectedUSer._id)}{" "}
//           <span className="w-2 h-2 border-0 rounded-full bg-blue-800"></span>
//         </p>
//         <img
//           onClick={() => setselectedUser(null)}
//           src={assets.arrow_icon}
//           alt=""
//           className="md:hidden max-w-7"
//         />
//         <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
//       </div>
//       {/* chat area */}

//       <div className="flex flex-col flex-1 bg-gradient-to-r from-teal-400 to-yellow-200">
//         <div className="flex flex-col flex-1 overflow-y-auto p-4">
//           {(message || []).map((msg, index) => (
//             <div
//               key={index}
//               className={`flex items-end gap-2 mb-4 ${
//                 msg.senderId === authUser._id
//                   ? "justify-end"
//                   : "justify-start flex-row-reverse"
//               }`}
//             >
//               {/* Message Bubble */}
//               {msg.image ? (
//                 <img
//                   src={assets.image}
//                   className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
//                   alt="message"
//                 />
//               ) : (
//                 <p
//                   className={`p-2 max-w-[250px] w-fit md:text-sm font-light rounded-lg break-words whitespace-pre-wrap text-white ${
//                     msg.senderId === authUser._id
//                       ? "bg-blue-500 rounded-br-none"
//                       : "bg-gray-500 rounded-bl-none"
//                   }`}
//                 >
//                   {msg.text}
//                 </p>
//               )}

//               {/* Avatar & Timestamp */}
//               <div className="flex flex-col items-center text-center text-xs">
//                 <img
//                   src={
//                     msg.senderId === authUser._id
//                       ? authUser.profilePic || assets.avatar_icon
//                       : selectedUSer?.profilePic || assets.avatar_icon
//                   }
//                   alt=""
//                   className="rounded-full w-8 h-8 mb-1"
//                 />
//                 <p className="text-gray-500">
//                   {formatMessageTime(msg.createdAt)}
//                 </p>
//               </div>
//             </div>
//           ))}
//           <div ref={scrollEnd}></div>
//         </div>

//         {/* msg Input */}
//         <div className="h-[70px] border-t border-gray-300 flex items-center px-4 gap-3">
//           <input
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//             onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 p-2 rounded-lg bg-gray-200 outline-none"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center text-center ">
//       <img src="yoyo-logo.png" className="" alt="" />
//       <p className="text-lg font-medium text-white">
//         Let's enjoy your time with YoYo Chatting Web App
//       </p>
//     </div>
//   );
// }

// export default Chatbar;

import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/chat-app-assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../contaxt/chatContext.jsx";
import AuthContaxt from "../../Contaxt/AuthContaxt.jsx";

function Chatbar() {
  const { message, selectedUSer, setselectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUser } = useContext(AuthContaxt);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedUSer) return; // Prevent sending without selected user
    if (!input.trim()) return; // Ignore empty messages
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Fetch messages whenever a user is selected
  useEffect(() => {
    if (selectedUSer?._id) {
      getMessages(selectedUSer._id);
    }
  }, [selectedUSer]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollEnd.current && message?.length) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  // Show placeholder if no user is selected
  if (!selectedUSer) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <img src="yoyo-logo.png" alt="Logo" className="mb-4" />
        <p className="text-lg font-medium text-white">
          Let's enjoy your time with YoYo Chatting Web App
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-scroll relative backdrop-blur-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUSer.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUSer.fullname}
          {onlineUser?.includes(selectedUSer._id.toString()) && (
            <span className="w-2 h-2 rounded-full bg-blue-500 ml-1"></span>
          )}
        </p>
        <img
          onClick={() => setselectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat Area */}
      
<div className="flex flex-col flex-1 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-400 relative">
  {/* Messages Container */}
  <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
    {(message || []).map(
      (msg, index) =>
        msg && (
          <div
            key={index}
            className={`flex items-end gap-3 max-w-[80%] ${
              msg.senderId === authUser._id
                ? "ml-auto justify-end flex-row-reverse"
                : "mr-auto justify-start"
            }`}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser.profilePic || assets.avatar_icon
                    : selectedUSer?.profilePic || assets.avatar_icon
                }
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
              />
            </div>

            {/* Message Bubble */}
            <div className="flex flex-col">
              {msg.image ? (
                <img
                  src={msg.image || assets.image}
                  alt="message"
                  className="max-w-[220px] rounded-xl border border-gray-200 shadow-md"
                />
              ) : (
                <p
                  className={`px-4 py-2 rounded-2xl text-sm shadow-md break-words whitespace-pre-wrap transition-all duration-300 ${
                    msg.senderId === authUser._id
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.text || ""}
                </p>
              )}

              {/* Timestamp */}
              <span className="text-xs text-gray-400 mt-1 ml-1">
                {msg.createdAt ? formatMessageTime(msg.createdAt) : ""}
              </span>
            </div>
          </div>
        )
    )}
    <div ref={scrollEnd}></div>
  </div>

  {/* Input Area */}
  <div className="h-[70px] border-t border-gray-700 bg-gray-900/80 backdrop-blur-lg flex items-center px-4 gap-3">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
      placeholder="Type a message..."
      className="flex-1 p-3 rounded-full bg-gray-800 text-gray-200 placeholder-gray-500 outline-none border border-gray-600 focus:border-blue-500 transition"
    />
    <button
      onClick={handleSendMessage}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300"
    >
      Send
    </button>
  </div>
</div>
</div>
  );
}

export default Chatbar;
