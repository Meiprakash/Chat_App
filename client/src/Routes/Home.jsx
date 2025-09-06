import React from 'react'
import Chatbar from '../components/Chatbar'
import Sidebar from '../components/Sidebar'
import Rightbar from '../components/Rightbar'
import { useState } from 'react'

function Home() {
  const [selectUser ,setselectUser ] = useState(false)
  return (
    //     <div className=" w-full h-screen sm:px-[15%] sm:py-[5%]  ">
    //       {/* dai kelu irukra "selectUser thevai illa but summa irukku" */}
    //       <div
    //         className={`backdrop-blur-3xl bg-gradient-to-r from-teal-200 to-teal-500   rounded-2x1
    //  h-[100%] grid grid-cols-2 relative ${
    //           selectUser
    //             ? "md : grid-cols- [1.5fr_1fr]  : grid-cols-[1.5fr_2fr]"
    //             : "md: grid-cols-2"
    //         } `}
    //       >
    //         <Sidebar />
    //         <Chatbar />
    //         {/* <Rightbar /> */}
    //       </div>
    //     </div>

    <div className="relative w-full h-screen overflow-hidden sm:px-[5%] sm:py-[3%] bg-gray-100">
      {/* Floating animated shapes */}
      <div className="absolute top-10 left-20 w-60 h-60 bg-teal-800 rounded-full opacity-20 animate-pulse -z-10"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-purple-900 rounded-full opacity-15 animate-bounce -z-10"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-500 rounded-full opacity-10 animate-pulse -z-10"></div>

      {/* Main chat container */}
      <div
        className={`relative backdrop-blur-2xl  flex-col flex-1 bg-gradient-to-r from-teal-400 to-purple-300 -2xl h-full grid gap-4 transition-all duration-700 ${
          selectUser ? "md:grid-cols-[1.5fr_2fr]" : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <Chatbar />
        {/* Uncomment Rightbar if needed */}
        {/* <Rightbar /> */}
      </div>
    </div>
  );
}

export default Home