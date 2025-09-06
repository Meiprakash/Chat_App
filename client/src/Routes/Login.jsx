import React, { useContext, useState } from "react";
import assets from "../assets/chat-app-assets/assets";
import AuthContaxt from "../../Contaxt/AuthContaxt.jsx";

function Login() {
  const [currState, setcurrState] = useState("Signup");
  const [fullname, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bio, setbio] = useState("");
  const [isDataSubmitted, setisDataSubmitted] = useState(false);


  const {login} = useContext(AuthContaxt)

  const handlerFunction = (e) => {
    e.preventDefault()

    if (currState === "Signup" && !isDataSubmitted) {
      setisDataSubmitted(true)
      return;
    }
    login(currState === "Signup" ? 'signup' : 'login', {fullname , email , password,bio})//the signle quotes is denote the path(api)
    
  }
  return (
    //     <div
    //       className="min-h-screen bg-cover bg-center flex items-center
    // justify-center gap-8 sm:justify-evenly max-sm: flex-col-2 backdrop-blur-2x1 "
    //     >
    //       <img src="yoyo-logo.png" alt="" className="w-[min(30vw, 250px) ]" />
    //       <form
    //         onSubmit={handlerFunction}
    //         className="border-2 bg-pruple-500 text-white border-gray-500 p-6 flex
    // flex-col gap-6 rounded-1g shadow-1g"
    //       >
    //         <h2 className="font-medium text-2x1 flex justify-between items-center">
    //           {currState}
    //           {isDataSubmitted && (
    //             <img
    //               onClick={() => setisDataSubmitted(false)}
    //               src={assets.arrow_icon}
    //               alt=""
    //               className="w-5 cursor-pointer"
    //             />
    //           )}
    //         </h2>
    //         {/* for Full name */}
    //         {currState === "Signup" && !isDataSubmitted && (
    //           <input
    //             type="text"
    //             value={fullname}
    //             onChange={(e) => setfullName(e.target.value)}
    //             className="p-2 border border-gray-500 rounded-md focus:outline-none text-gray-900"
    //             placeholder="Full Name"
    //             required
    //           />
    //         )}
    //         {/* for email and password */}

    //         {!isDataSubmitted && (
    //           <>
    //             <input
    //               type="email"
    //               value={email}
    //               onChange={(e) => setemail(e.target.value)}
    //               placeholder="Email"
    //               className="p-2 border  text-gray-900 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:rind-indigo-500"
    //             />
    //             <input
    //               type="password"
    //               value={password}
    //               onChange={(e) => setpassword(e.target.value)}
    //               placeholder="Password"
    //               className="p-2  text-gray-900 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:rind-indigo-500"
    //             />
    //           </>
    //         )}
    //         {/* bio page */}
    //         {currState === "Signup" && isDataSubmitted && (
    //           <textarea
    //             onChange={(e) => setbio(e.target.value)}
    //             placeholder="Provide a bio"
    //             required
    //             className=" text-gray-900"
    //           ></textarea>
    //         )}
    //         <button
    //           type="submit"
    //           className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
    //           // onClick={()=>navigate("/home")}
    //         >
    //           {currState === "Signup" ? "Create Account" : "Login Now"}
    //         </button>
    //         <div className="flex flex-col gap-2">
    //           {currState === "Signup" ? (
    //             <p className="text-sm text-gray-600">
    //               Already have an account ?{" "}
    //               <span
    //                 className="font-medium text-violet-500 cursor-pointer"
    //                 onClick={() => {
    //                   setcurrState("Login");
    //                   setisDataSubmitted(false);
    //                 }}
    //               >
    //                 Click Here
    //               </span>
    //             </p>
    //           ) : (
    //             <p className="text-sm text-gray-600">
    //               Create an account{" "}
    //               <span
    //                 className="
    //              font-medium text-violet-500 cursor-pointer"
    //                 onClick={() => setcurrState("Signup")}
    //               >
    //                 Click Here
    //               </span>
    //             </p>
    //           )}
    //         </div>
    //       </form>
    //     </div>

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 animate-gradient"></div>

      {/* Animated Floating Circles */}
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 top-40 right-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 bottom-20 left-1/3"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-12 z-10 p-4 w-full max-w-5xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src="yoyo-icon.png"
            alt="YoYo Logo"
            className="w-40 md:w-56 drop-shadow-xl"
          />
          <h1 className="text-white text-4xl font-bold mt-4 tracking-wide">
            YoYo
          </h1>
          <p className="text-gray-200 text-lg mt-2 max-w-xs">
            Chat, connect, and share moments with friends.
          </p>
        </div>

        {/* Auth Form */}
        <form
          onSubmit={handlerFunction}
          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-white"
        >
          <h2 className="font-semibold text-3xl text-center mb-6">
            {currState}
          </h2>

          {/* Full Name Input */}
          {currState === "Signup" && !isDataSubmitted && (
            <input
              type="text"
              value={fullname}
              onChange={(e) => setfullName(e.target.value)}
              placeholder="Full Name"
              className="p-3 mb-4 w-full bg-white/20 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300 transition-all duration-300"
              required
            />
          )}

          {/* Email & Password */}
          {!isDataSubmitted && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                className="p-3 mb-4 w-full bg-white/20 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300 transition-all duration-300"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                className="p-3 mb-4 w-full bg-white/20 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300 transition-all duration-300"
                required
              />
            </>
          )}

          {/* Bio Section */}
          {currState === "Signup" && isDataSubmitted && (
            <textarea
              value={bio}
              onChange={(e) => setbio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="p-3 mb-4 w-full bg-white/20 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300 transition-all duration-300"
              required
            ></textarea>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 transition-all duration-300 text-lg font-medium shadow-lg"
          >
            {currState === "Signup" ? "Create Account" : "Login Now"}
          </button>

          {/* Switch Between Login & Signup */}
          <p className="text-center mt-4 text-gray-300">
            {currState === "Signup" ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-purple-300 cursor-pointer hover:underline"
                  onClick={() => {
                    setcurrState("Login");
                    setisDataSubmitted(false);
                  }}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="text-purple-300 cursor-pointer hover:underline"
                  onClick={() => setcurrState("Signup")}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
