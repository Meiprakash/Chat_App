import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import Login from "./Routes/Login.jsx";
import Signup from "./Routes/Signup.jsx";
import Layout from "./Routes/Layout.jsx";
import Profile from "./Routes/Profile.jsx";
import { AuthProvider } from "../Contaxt/AuthContaxt.jsx";
import { ChatProvider } from "./contaxt/chatContext.jsx";

// const route = createBrowserRouter(
//   createRoutesFromElements(

//     <Route path="/" element={<Layout />}>
//       <Route path='/home' element={ <Home/>} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path='/profile' element={<Profile/>}/>
//     </Route>
//   )
// );

createRoot(document.getElementById("root")).render(
  // <RouterProvider router={route}>
  <BrowserRouter>
    {/* below Authprovider is a COntaxt hook */}
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>

  // </RouterProvider>,
);
