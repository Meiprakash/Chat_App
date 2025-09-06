// import { useContext, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Routes/Home.jsx";
// import Login from "./Routes/Login.jsx";
// import Signup from "./Routes/Signup.jsx";
// import Profile from "./Routes/Profile.jsx";
// import {Toaster} from "react-hot-toast"
// import AuthContaxt from "../Contaxt/AuthContaxt.jsx";

// function App() {
//   const {authUser}= useContext(AuthContaxt)
//   const [count, setCount] = useState(0);

//   return (
//     <div className="bg-[url('./src/assests/voxta.png')] bg-contain">
//       <Toaster/>
//       <Routes>
//         <Route path="/" element={authUser ?< Home/> : <Navigate to={"/login"}/>} />
//         <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/"}/>} />
//         <Route path="/profile" element={authUser ? <Profile/> : <Navigate to={"/login"}/> } />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import Login from "./Routes/Login.jsx";
import Signup from "./Routes/Signup.jsx";
import Profile from "./Routes/Profile.jsx";
import { Toaster } from "react-hot-toast";
import AuthContaxt from "../Contaxt/AuthContaxt.jsx";

function App() {
  const { authUser } = useContext(AuthContaxt);

  return (
    // <div className="min-h-screen bg-gray-100 bg-[url('/voxta.png')] bg-repeat">
    //   <Toaster />
    //   <Routes>
    //     {/* if user not logged in → go to signup */}
    //     <Route
    //       path="/"
    //       element={authUser ? <Home /> : <Navigate to="/login" />}
    //     />

    //     {/* signup and login routes */}
    //     <Route
    //       path="/login"
    //       element={!authUser ? <Login /> : <Navigate to="/" />}
    //     />
    //     <Route
    //       path="/login"
    //       element={!authUser ? <Login /> : <Navigate to="/" />}
    //     />

    //     {/* profile route */}
    //     <Route
    //       path="/profile"
    //       element={authUser ? <Profile /> : <Navigate to="/login" />}
    //     />
    //   </Routes>
    // </div>
    <div className="relative  min-h-screen bg-purple-500">
      {/* Floating shapes */}
      <div className="absolute top-10 left-20 w-60 h-60 bg-blue-400 rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600 rounded-full opacity-15 -z-10"></div>

      {/* App content */}
      <div className="relative z-10">
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

